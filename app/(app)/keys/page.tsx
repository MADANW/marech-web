"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlusIcon, LockIcon, CheckIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/Toast";
import { isMock, listKeys, createKey, revokeKey, type ApiKey } from "@/lib/api";

// Demo keys seed mock mode only; live mode starts empty and fills from the API.
const MOCK_KEYS: ApiKey[] = [
  { id: 1, name: "Production (Cloudflare Worker)", siteUrl: "https://example.com", createdAt: new Date(Date.now() - 5 * 86_400_000).toISOString(), revoked: false },
];

interface KeyForm {
  name: string;
  siteUrl: string;
}

export default function KeysPage() {
  const { data: apiData, error, isLoading, mutate } = useSWR(isMock ? null : "keys", listKeys);
  const [keys, setKeys] = useState<ApiKey[]>(isMock ? MOCK_KEYS : []);
  const [modalOpen, setModalOpen] = useState(false);
  const [newKey, setNewKey] = useState<{ name: string; key: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [revokeConfirm, setRevokeConfirm] = useState<number | null>(null);
  const toast = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<KeyForm>();

  useEffect(() => {
    if (!isMock && apiData?.keys) setKeys(apiData.keys);
  }, [apiData]);

  const openCreate = () => {
    reset({ name: "", siteUrl: "" });
    setModalOpen(true);
  };

  const onCreate = async (data: KeyForm) => {
    try {
      if (isMock) {
        const raw = `bm_${Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
        setKeys((prev) => [
          { id: Date.now(), name: data.name, siteUrl: data.siteUrl || null, createdAt: new Date().toISOString(), revoked: false },
          ...prev,
        ]);
        setModalOpen(false);
        setNewKey({ name: data.name, key: raw });
      } else {
        const res = await createKey(data.name, data.siteUrl || undefined);
        setModalOpen(false);
        setNewKey({ name: res.name, key: res.key });
        mutate();
      }
    } catch {
      toast.error("Couldn't create key", "Please try again.");
    }
  };

  const revoke = async (id: number) => {
    const name = keys.find((k) => k.id === id)?.name ?? "Key";
    try {
      if (isMock) {
        setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, revoked: true } : k)));
      } else {
        await revokeKey(id);
        mutate();
      }
    } catch {
      toast.error("Couldn't revoke key", "Please try again.");
      return;
    }
    setRevokeConfirm(null);
    toast.success("Key revoked", name);
  };

  const copyKey = async () => {
    if (!newKey) return;
    try {
      await navigator.clipboard.writeText(newKey.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy", "Select the key and copy it manually.");
    }
  };

  const active = keys.filter((k) => !k.revoked);

  return (
    <div className="p-7 max-w-4xl mx-auto space-y-5">
      <PageHeader
        title="API keys"
        subtitle="Authenticate the server-side integrations that actually block scrapers"
        action={
          <Button variant="accent" size="sm" className="!rounded-lg" onClick={openCreate}>
            <PlusIcon className="h-4 w-4" /> Create key
          </Button>
        }
      />

      <Card padding="md" className="text-[13px] text-app-muted">
        <p className="mb-2 text-app-text font-semibold">What are these for?</p>
        <p>
          The pasted snippet monitors traffic, but it can&apos;t block non-JS scrapers
          (curl, python-requests, GPTBot…). To actually block them, run an enforcement
          integration in front of your site — the <span className="text-app-text">nginx proxy</span>,{" "}
          <span className="text-app-text">Cloudflare Worker</span>, <span className="text-app-text">Vercel middleware</span>, or{" "}
          <span className="text-app-text">WordPress plugin</span>. Each needs one of these API keys
          plus a <a href="/policies" className="text-accent hover:underline">block policy</a>.
        </p>
      </Card>

      {!isMock && error && (
        <Card padding="lg" className="text-center">
          <h2 className="font-semibold text-app-text mb-1">Couldn&apos;t load keys</h2>
          <p className="text-app-muted text-sm mb-4">The API didn&apos;t respond. Try again.</p>
          <Button variant="secondary" size="sm" className="!rounded-lg" onClick={() => mutate()}>Retry</Button>
        </Card>
      )}

      {!isMock && isLoading && !error && (
        <Card padding="lg" className="text-center text-sm text-app-muted">Loading keys…</Card>
      )}

      {active.length === 0 && !(!isMock && (isLoading || error)) && (
        <Card padding="lg" className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
            <LockIcon className="h-6 w-6" />
          </div>
          <h2 className="font-semibold text-app-text mb-1">No API keys yet</h2>
          <p className="text-app-muted text-sm mb-4">Create one to set up server-side blocking.</p>
          <Button variant="accent" size="sm" className="!rounded-lg" onClick={openCreate}>
            <PlusIcon className="h-4 w-4" /> Create key
          </Button>
        </Card>
      )}

      <div className="space-y-3">
        {keys.map((k) => (
          <Card key={k.id} padding="md" className="transition-colors hover:border-white/15">
            <div className="flex items-start gap-4">
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${k.revoked ? "bg-white/[0.06] text-app-faint" : "bg-accent/12 text-accent"}`}>
                <LockIcon className="h-[18px] w-[18px]" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-app-text truncate">{k.name}</span>
                  <Badge variant={k.revoked ? "neutral" : "success"}>{k.revoked ? "Revoked" : "Active"}</Badge>
                </div>
                <div className="text-[13px] text-app-muted space-y-0.5">
                  {k.siteUrl && <div className="truncate">Site: {k.siteUrl}</div>}
                  <div className="text-app-faint text-xs">Created {new Date(k.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              {!k.revoked && (
                <div className="shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => setRevokeConfirm(k.id)} className="text-red-400 hover:bg-danger/10">
                    Revoke
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Create modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create API key">
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <Input
            label="Name"
            placeholder="Production (Cloudflare Worker)"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
          <Input label="Site URL (optional)" placeholder="https://example.com" {...register("siteUrl")} />
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="accent" size="md" className="flex-1 !rounded-lg">Create key</Button>
            <Button type="button" variant="secondary" size="md" className="!rounded-lg" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Show-once new-key modal */}
      <Modal open={newKey !== null} onClose={() => setNewKey(null)} title="Copy your API key">
        <p className="text-app-muted text-sm mb-3">
          This is the only time the full key is shown. Store it somewhere safe — you can&apos;t
          view it again (create a new one if you lose it).
        </p>
        <div className="bg-app-inset border border-app-border rounded-lg px-4 py-3 mb-4">
          <pre className="font-mono text-[13px] text-emerald-300 whitespace-pre-wrap break-all">{newKey?.key}</pre>
        </div>
        <div className="flex gap-3">
          <Button variant="accent" size="md" className="flex-1 !rounded-lg" onClick={copyKey}>
            {copied ? (<><CheckIcon className="h-4 w-4" /> Copied</>) : "Copy key"}
          </Button>
          <Button variant="secondary" size="md" className="!rounded-lg" onClick={() => setNewKey(null)}>Done</Button>
        </div>
      </Modal>

      {/* Revoke confirm */}
      <Modal open={revokeConfirm !== null} onClose={() => setRevokeConfirm(null)} title="Revoke API key">
        <p className="text-app-muted text-sm mb-6">
          Any integration using this key will stop enforcing immediately (and, being fail-open,
          will pass traffic through). This can&apos;t be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" size="md" className="flex-1 !rounded-lg" onClick={() => revoke(revokeConfirm!)}>Revoke</Button>
          <Button variant="secondary" size="md" className="!rounded-lg" onClick={() => setRevokeConfirm(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
