"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Toggle } from "@/components/ui/Toggle";
import { MOCK_POLICIES, type Policy, type BotType } from "@/lib/mock";

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
  const [policies, setPolicies] = useState<Policy[]>(MOCK_POLICIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPolicy, setEditPolicy] = useState<Policy | null>(null);
  const [selectedBotTypes, setSelectedBotTypes] = useState<BotType[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

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

  const onSave = (data: PolicyForm) => {
    const policy: Policy = {
      id: editPolicy?.id ?? Date.now(),
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
    if (editPolicy) {
      setPolicies((prev) => prev.map((p) => (p.id === editPolicy.id ? policy : p)));
    } else {
      setPolicies((prev) => [policy, ...prev]);
    }
    setModalOpen(false);
  };

  const toggleEnabled = (id: number) => {
    setPolicies((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  const deletePolicy = (id: number) => {
    setPolicies((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const toggleBotType = (bt: BotType) => {
    setSelectedBotTypes((prev) =>
      prev.includes(bt) ? prev.filter((b) => b !== bt) : [...prev, bt]
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Policies</h1>
          <p className="text-gray-500 text-sm mt-0.5">Rules that decide what gets blocked</p>
        </div>
        <Button variant="accent" size="sm" onClick={openCreate}>
          + Create Policy
        </Button>
      </div>

      {policies.length === 0 && (
        <Card padding="lg" className="text-center">
          <div className="text-4xl mb-3">🛡️</div>
          <h2 className="font-semibold text-gray-900 mb-1">No policies yet</h2>
          <p className="text-gray-500 text-sm mb-4">Create your first policy to customize what gets blocked.</p>
          <Button variant="accent" size="sm" onClick={openCreate}>Create Policy</Button>
        </Card>
      )}

      <div className="space-y-4">
        {policies.map((policy) => (
          <Card key={policy.id} padding="md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">{policy.name}</span>
                  <Badge variant={policy.enabled ? "success" : "neutral"}>
                    {policy.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                  <span className="text-xs text-gray-400">Priority {policy.priority}</span>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
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
                  className="text-danger hover:bg-danger-light">Delete</Button>
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
            <label className="text-sm font-medium text-gray-700 block mb-2">Bot types</label>
            <div className="flex flex-wrap gap-2">
              {BOT_TYPE_OPTIONS.map((bt) => (
                <button
                  key={bt.value}
                  type="button"
                  onClick={() => toggleBotType(bt.value)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                    selectedBotTypes.includes(bt.value)
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary"
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
            <label className="text-sm font-medium text-gray-700 block mb-2">Action</label>
            <div className="flex gap-3">
              {(["block", "allow", "log"] as const).map((a) => (
                <label key={a} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={a} {...register("action")} className="text-primary" />
                  <span className="text-sm capitalize text-gray-700">{a}</span>
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
        <p className="text-gray-600 text-sm mb-6">
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
