"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
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
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-mono)" }}>Account Settings</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
              tab === t ? "bg-accent text-white shadow-sm" : "text-white/50 hover:text-white"
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
            <div className="text-sm font-medium text-white/70 mb-1">Email</div>
            <div className="text-white/60 text-sm bg-white/5 rounded-lg px-3 py-2">{user?.email}</div>
          </div>
          <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="space-y-4">
            <Input
              label="Website URL"
              placeholder="https://yoursite.com"
              {...profileForm.register("websiteUrl")}
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-white/70">Platform</label>
              <select className="w-full px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 [&>option]:bg-gray-900" {...profileForm.register("platform")}>
                {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-white/70">Industry</label>
              <select className="w-full px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 [&>option]:bg-gray-900" {...profileForm.register("industry")}>
                {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <Button type="submit" variant="accent" size="md" disabled={profileForm.formState.isSubmitting}>
              {profileSaved ? "✓ Saved!" : profileForm.formState.isSubmitting ? "Saving…" : "Save Changes"}
            </Button>
          </form>
        </Card>
      )}

      {/* Security */}
      {tab === "Security" && (
        <Card padding="md">
          <h2 className="font-semibold text-white mb-4">Change Password</h2>
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
            <Button type="submit" variant="accent" size="md" disabled={passwordForm.formState.isSubmitting}>
              {passwordSaved ? "✓ Password Updated!" : passwordForm.formState.isSubmitting ? "Updating…" : "Update Password"}
            </Button>
          </form>
        </Card>
      )}

      {/* Danger Zone */}
      {tab === "Danger Zone" && (
        <Card padding="md" className="border-danger/30">
          <h2 className="font-semibold text-red-400 mb-2">Delete Account</h2>
          <p className="text-white/50 text-sm mb-4">
            Permanently deletes your account, snippet, and all data. This cannot be undone.
            Your website will no longer be protected.
          </p>
          <Button variant="danger" size="sm" onClick={() => setDeleteModal(true)}>
            Delete My Account
          </Button>
        </Card>
      )}

      {/* Delete modal */}
      <Modal open={deleteModal} onClose={() => { setDeleteModal(false); setDeleteInput(""); }} title="Delete Account">
        <p className="text-white/60 text-sm mb-4">
          This will permanently delete your account and stop all protection. Type <strong className="text-white">DELETE</strong> to confirm.
        </p>
        <input
          type="text"
          value={deleteInput}
          onChange={(e) => setDeleteInput(e.target.value)}
          placeholder="Type DELETE"
          className="w-full px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-white placeholder-white/30 text-sm outline-none focus:border-danger focus:ring-2 focus:ring-danger/20 mb-4"
        />
        <div className="flex gap-3">
          <Button
            variant="danger"
            size="md"
            className="flex-1"
            disabled={deleteInput !== "DELETE"}
            onClick={handleDelete}
          >
            Delete Account
          </Button>
          <Button variant="secondary" size="md" onClick={() => { setDeleteModal(false); setDeleteInput(""); }}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
