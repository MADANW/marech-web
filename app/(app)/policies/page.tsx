"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Toggle } from "@/components/ui/Toggle";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlusIcon, ShieldPlusIcon } from "@/components/ui/icons";
import { MOCK_POLICIES, type Policy, type BotType } from "@/lib/mock";
import { isMock, fetchPolicies, createPolicy, updatePolicy, deletePolicy as apiDeletePolicy } from "@/lib/api";

const BOT_TYPE_OPTIONS: { value: BotType; label: string }[] = [
  { value: "scraper", label: "Scraper" },
  { value: "ai_tool", label: "AI Tool" },
  { value: "local_llm", label: "Local LLM" },
];

interface PolicyForm {
  name: string;
  action: "block" | "allow" | "log";
  priority: number;
  pathPatterns: string;
  ipRanges: string;
}

export default function PoliciesPage() {
  const { data: apiData, mutate } = useSWR(
    isMock ? null : "policies",
    fetchPolicies
  );
  const [policies, setPolicies] = useState<Policy[]>(MOCK_POLICIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPolicy, setEditPolicy] = useState<Policy | null>(null);
  const [selectedBotTypes, setSelectedBotTypes] = useState<BotType[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    if (!isMock && apiData?.policies) {
      setPolicies(apiData.policies as Policy[]);
    }
  }, [apiData]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PolicyForm>({
    defaultValues: { action: "block", priority: 100 },
  });

  const openCreate = () => {
    setEditPolicy(null);
    setSelectedBotTypes([]);
    reset({ action: "block", priority: 100, name: "", pathPatterns: "", ipRanges: "" });
    setModalOpen(true);
  };

  const openEdit = (p: Policy) => {
    setEditPolicy(p);
    setSelectedBotTypes(p.conditions.botTypes ?? []);
    reset({
      name: p.name,
      action: p.action,
      priority: p.priority,
      pathPatterns: (p.conditions.pathPatterns ?? []).join(", "),
      ipRanges: (p.conditions.ipRanges ?? []).join(", "),
    });
    setModalOpen(true);
  };

  const onSave = async (data: PolicyForm) => {
    const payload = {
      name: data.name,
      enabled: editPolicy?.enabled ?? true,
      conditions: {
        botTypes: selectedBotTypes.length > 0 ? selectedBotTypes : undefined,
        pathPatterns: data.pathPatterns ? data.pathPatterns.split(",").map((s) => s.trim()) : undefined,
        ipRanges: data.ipRanges ? data.ipRanges.split(",").map((s) => s.trim()) : undefined,
      },
      action: data.action,
      priority: Number(data.priority),
    };

    if (isMock) {
      const policy: Policy = { id: editPolicy?.id ?? Date.now(), ...payload };
      if (editPolicy) {
        setPolicies((prev) => prev.map((p) => (p.id === editPolicy.id ? policy : p)));
      } else {
        setPolicies((prev) => [policy, ...prev]);
      }
    } else {
      if (editPolicy) {
        await updatePolicy(editPolicy.id, payload);
      } else {
        await createPolicy(payload);
      }
      mutate();
    }
    setModalOpen(false);
  };

  const toggleEnabled = async (id: number) => {
    const target = policies.find((p) => p.id === id);
    if (!target) return;
    if (isMock) {
      setPolicies((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
    } else {
      await updatePolicy(id, { enabled: !target.enabled });
      mutate();
    }
  };

  const deletePolicy = async (id: number) => {
    if (isMock) {
      setPolicies((prev) => prev.filter((p) => p.id !== id));
    } else {
      await apiDeletePolicy(id);
      mutate();
    }
    setDeleteConfirm(null);
  };

  const toggleBotType = (bt: BotType) => {
    setSelectedBotTypes((prev) =>
      prev.includes(bt) ? prev.filter((b) => b !== bt) : [...prev, bt]
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Policies"
        subtitle="Rules that decide what gets blocked, allowed, or logged"
        action={
          <Button variant="accent" size="sm" onClick={openCreate}>
            <PlusIcon className="h-4 w-4" /> Create Policy
          </Button>
        }
      />

      {policies.length === 0 && (
        <Card padding="lg" className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
            <ShieldPlusIcon className="h-7 w-7" />
          </div>
          <h2 className="font-semibold text-white mb-1">No policies yet</h2>
          <p className="text-white/50 text-sm mb-4">Create your first policy to customize what gets blocked.</p>
          <Button variant="accent" size="sm" onClick={openCreate}>
            <PlusIcon className="h-4 w-4" /> Create Policy
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        {policies.map((policy) => (
          <Card key={policy.id} padding="md" className="transition-colors hover:border-white/20">
            <div className="flex items-start gap-4">
              <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${policy.enabled ? "border-accent/25 bg-accent/10 text-accent" : "border-white/10 bg-white/5 text-white/40"}`}>
                <ShieldPlusIcon className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-white">{policy.name}</span>
                  <Badge variant={policy.enabled ? "success" : "neutral"}>
                    {policy.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                  <span className="text-xs text-white/40">Priority {policy.priority}</span>
                </div>
                <div className="text-sm text-white/50 space-y-1">
                  {policy.conditions.botTypes && (
                    <div>Bot types: {policy.conditions.botTypes.join(", ")}</div>
                  )}
                  {policy.conditions.pathPatterns && (
                    <div>Paths: {policy.conditions.pathPatterns.join(", ")}</div>
                  )}
                  {policy.conditions.ipRanges && (
                    <div>IP ranges: {policy.conditions.ipRanges.join(", ")}</div>
                  )}
                </div>
                <div className="mt-2">
                  <Badge variant={policy.action === "block" ? "danger" : policy.action === "allow" ? "success" : "warning"}>
                    Action: {policy.action}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Toggle enabled={policy.enabled} onChange={() => toggleEnabled(policy.id)} />
                <Button variant="ghost" size="sm" onClick={() => openEdit(policy)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(policy.id)}
                  className="text-red-400 hover:bg-danger/10">Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editPolicy ? "Edit Policy" : "Create Policy"}
      >
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <Input
            label="Policy name"
            placeholder="Block AI Scrapers"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          <div>
            <label className="text-sm font-medium text-white/70 block mb-2">Bot types</label>
            <div className="flex flex-wrap gap-2">
              {BOT_TYPE_OPTIONS.map((bt) => (
                <button
                  key={bt.value}
                  type="button"
                  onClick={() => toggleBotType(bt.value)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                    selectedBotTypes.includes(bt.value)
                      ? "bg-accent text-white border-accent"
                      : "bg-white/5 text-white/70 border-white/15 hover:border-accent/60"
                  }`}
                >
                  {bt.label}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Path patterns (comma-separated)"
            placeholder="/api/*, /admin"
            {...register("pathPatterns")}
          />
          <Input
            label="IP ranges (comma-separated)"
            placeholder="192.168.1.0/24"
            {...register("ipRanges")}
          />

          <div>
            <label className="text-sm font-medium text-white/70 block mb-2">Action</label>
            <div className="flex gap-3">
              {(["block", "allow", "log"] as const).map((a) => (
                <label key={a} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={a} {...register("action")} className="accent-[#f97316]" />
                  <span className="text-sm capitalize text-white/70">{a}</span>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Priority (0–1000, higher = evaluated first)"
            type="number"
            error={errors.priority?.message}
            {...register("priority", { min: { value: 0, message: "Min 0" }, max: { value: 1000, message: "Max 1000" } })}
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="accent" size="md" className="flex-1">
              {editPolicy ? "Save Changes" : "Create Policy"}
            </Button>
            <Button type="button" variant="secondary" size="md" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm modal */}
      <Modal open={deleteConfirm !== null} onClose={() => setDeleteConfirm(null)} title="Delete Policy">
        <p className="text-white/60 text-sm mb-6">
          Are you sure? This policy will be deleted and bots it was blocking may get through.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" size="md" className="flex-1" onClick={() => deletePolicy(deleteConfirm!)}>
            Delete
          </Button>
          <Button variant="secondary" size="md" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
