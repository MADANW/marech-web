"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckIcon } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth";
import { isMock, updateMe, updatePassword as apiUpdatePassword, deleteAccount } from "@/lib/api";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = ["Profile", "Security", "Danger Zone"] as const;
type Tab = (typeof TABS)[number];

const PLATFORMS = ["Wix", "Squarespace", "Shopify", "WordPress", "Webflow", "Custom / Other"];
const INDUSTRIES = ["Blog", "E-commerce", "SaaS", "Portfolio", "Other"];

interface ProfileForm { websiteUrl: string; platform: string; industry: string; }
interface PasswordForm { current: string; next: string; confirm: string; }

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Profile");
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const profileForm = useForm<ProfileForm>({
    defaultValues: {
      websiteUrl: user?.websiteUrl ?? "",
      platform: user?.platform ?? PLATFORMS[0],
      industry: "Blog",
    },
  });
  const passwordForm = useForm<PasswordForm>();

  const onSaveProfile = async (data: ProfileForm) => {
    if (!isMock) await updateMe({ websiteUrl: data.websiteUrl, platform: data.platform });
    else await new Promise((r) => setTimeout(r, 600));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const onSavePassword = async (data: PasswordForm) => {
    if (data.next !== data.confirm) {
      passwordForm.setError("confirm", { message: "Passwords don't match" });
      return;
    }
    if (!isMock) await apiUpdatePassword({ currentPassword: data.current, newPassword: data.next });
    else await new Promise((r) => setTimeout(r, 600));
    passwordForm.reset();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  const handleDelete = async () => {
    if (deleteInput !== "DELETE") return;
    if (!isMock) {
      try {
        await deleteAccount();
      } catch {
        // Even if the call fails, fall through to local logout.
      }
    }
    logout();
    router.push("/");
  };

  return (
    <div className="p-7 max-w-2xl mx-auto space-y-5">
      <PageHeader title="Account settings" subtitle="Manage your profile, security, and account" />

      {/* Tabs */}
      <div className="flex gap-1 bg-app-inset p-1 rounded-lg w-fit border border-app-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              tab === t ? "bg-app-card text-app-text" : "text-app-muted hover:text-app-text"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Profile */}
      {tab === "Profile" && (
        <Card padding="md">
          <div className="mb-4">
            <div className="text-sm font-medium text-app-muted mb-1.5">Email</div>
            <div className="text-app-muted text-sm bg-app-inset border border-app-border rounded-lg px-3 py-2">{user?.email}</div>
          </div>
          <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="space-y-4">
            <Input
              label="Website URL"
              placeholder="https://yoursite.com"
              {...profileForm.register("websiteUrl")}
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-app-muted">Platform</label>
              <select className="w-full px-3 py-2 rounded-lg border border-app-border bg-app-inset text-app-text text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 [&>option]:bg-[#141416]" {...profileForm.register("platform")}>
                {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-app-muted">Industry</label>
              <select className="w-full px-3 py-2 rounded-lg border border-app-border bg-app-inset text-app-text text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 [&>option]:bg-[#141416]" {...profileForm.register("industry")}>
                {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <Button type="submit" variant="accent" size="md" className="!rounded-lg" disabled={profileForm.formState.isSubmitting}>
              {profileSaved ? (<><CheckIcon className="h-4 w-4" /> Saved</>) : profileForm.formState.isSubmitting ? "Saving…" : "Save changes"}
            </Button>
          </form>
        </Card>
      )}

      {/* Security */}
      {tab === "Security" && (
        <Card padding="md">
          <h2 className="font-semibold text-app-text mb-4">Change password</h2>
          <form onSubmit={passwordForm.handleSubmit(onSavePassword)} className="space-y-4">
            <Input
              label="Current password"
              type="password"
              placeholder="••••••••"
              error={passwordForm.formState.errors.current?.message}
              {...passwordForm.register("current", { required: "Required" })}
            />
            <Input
              label="New password"
              type="password"
              placeholder="Min. 8 characters"
              error={passwordForm.formState.errors.next?.message}
              {...passwordForm.register("next", {
                required: "Required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
            />
            <Input
              label="Confirm new password"
              type="password"
              placeholder="••••••••"
              error={passwordForm.formState.errors.confirm?.message}
              {...passwordForm.register("confirm", { required: "Required" })}
            />
            <Button type="submit" variant="accent" size="md" className="!rounded-lg" disabled={passwordForm.formState.isSubmitting}>
              {passwordSaved ? (<><CheckIcon className="h-4 w-4" /> Password updated</>) : passwordForm.formState.isSubmitting ? "Updating…" : "Update password"}
            </Button>
          </form>
        </Card>
      )}

      {/* Danger Zone */}
      {tab === "Danger Zone" && (
        <Card padding="md" className="border-danger/30">
          <h2 className="font-semibold text-red-400 mb-2">Delete account</h2>
          <p className="text-app-muted text-sm mb-4">
            Permanently deletes your account, snippet, and all data. This cannot be undone.
            Your website will no longer be protected.
          </p>
          <Button variant="danger" size="sm" className="!rounded-lg" onClick={() => setDeleteModal(true)}>
            Delete my account
          </Button>
        </Card>
      )}

      {/* Delete modal */}
      <Modal open={deleteModal} onClose={() => { setDeleteModal(false); setDeleteInput(""); }} title="Delete account">
        <p className="text-app-muted text-sm mb-4">
          This will permanently delete your account and stop all protection. Type <strong className="text-app-text">DELETE</strong> to confirm.
        </p>
        <input
          type="text"
          value={deleteInput}
          onChange={(e) => setDeleteInput(e.target.value)}
          placeholder="Type DELETE"
          className="w-full px-3 py-2 rounded-lg border border-app-border bg-app-inset text-app-text placeholder-app-faint text-sm outline-none focus:border-danger focus:ring-2 focus:ring-danger/20 mb-4"
        />
        <div className="flex gap-3">
          <Button
            variant="danger"
            size="md"
            className="flex-1 !rounded-lg"
            disabled={deleteInput !== "DELETE"}
            onClick={handleDelete}
          >
            Delete account
          </Button>
          <Button variant="secondary" size="md" className="!rounded-lg" onClick={() => { setDeleteModal(false); setDeleteInput(""); }}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
