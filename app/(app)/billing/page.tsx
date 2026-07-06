"use client";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { CreditCardIcon, ReceiptIcon, ZapIcon } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth";
import { MOCK_BILLING_HISTORY } from "@/lib/mock";
import { formatNumber } from "@/lib/utils";
import { isMock, openBillingPortal } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";

const PLAN_NAMES: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  enterprise: "Enterprise",
};

const PLAN_PRICES: Record<string, string> = {
  free: "$0",
  starter: "$25",
  pro: "$50",
  enterprise: "$125",
};

export default function BillingPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [portalBusy, setPortalBusy] = useState(false);

  // Open the Stripe billing portal (manage card, invoices, cancellation).
  const goToPortal = async () => {
    if (isMock) return;
    setPortalBusy(true);
    try {
      const { url } = await openBillingPortal();
      window.location.href = url;
    } catch {
      setPortalBusy(false);
      toast.error("Couldn't open billing portal", "Please try again in a moment.");
    }
  };

  if (!user) return null;

  const usagePct = Math.min((user.usageThisMonth / user.planLimit) * 100, 100);

  return (
    <div className="p-7 max-w-3xl mx-auto space-y-5">
      <PageHeader title="Billing" subtitle="Manage your plan, payment method, and invoices" />

      {/* Current plan */}
      <Card padding="md">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/12 text-accent">
              <ZapIcon className="h-[18px] w-[18px]" />
            </span>
            <div>
              <h2 className="font-semibold text-app-text mb-1">
                {PLAN_NAMES[user.plan]} plan — {PLAN_PRICES[user.plan]}/month
              </h2>
              <Badge variant={user.status === "active" ? "success" : user.status === "trial" ? "primary" : "danger"}>
                {user.status === "trial" ? `Trial · ${user.trialDaysLeft} days left` : user.status}
              </Badge>
            </div>
          </div>
          <Link href="/pricing">
            <Button variant="secondary" size="sm" className="!rounded-lg">Upgrade plan</Button>
          </Link>
        </div>

        <div className="mb-1">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-app-muted">Usage this month</span>
            <span className="font-medium text-app-text tabular-nums">
              {formatNumber(user.usageThisMonth)} / {formatNumber(user.planLimit)} requests
            </span>
          </div>
          <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${usagePct > 90 ? "bg-danger" : usagePct > 70 ? "bg-warning" : "bg-accent"}`}
              style={{ width: `${usagePct}%` }}
            />
          </div>
          <div className="text-xs text-app-faint mt-1.5 text-right tabular-nums">{usagePct.toFixed(0)}% used</div>
        </div>
      </Card>

      {/* Payment method */}
      <Card padding="md">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-app-muted">
              <CreditCardIcon className="h-[18px] w-[18px]" />
            </span>
            <div>
              <h2 className="font-semibold text-app-text mb-1">Payment method</h2>
              {isMock ? (
                <div className="flex items-center gap-3">
                  <div className="bg-white/[0.08] px-2.5 py-1 rounded text-xs font-mono font-semibold text-app-text">VISA</div>
                  <div className="text-sm text-app-text">•••• 1234</div>
                  <div className="text-sm text-app-faint">Expires 12/25</div>
                </div>
              ) : (
                <div className="text-sm text-app-muted">Cards are managed securely in the Stripe billing portal.</div>
              )}
            </div>
          </div>
          <Button variant="secondary" size="sm" className="!rounded-lg" onClick={goToPortal} disabled={portalBusy}>
            {portalBusy ? "Opening…" : "Update card"}
          </Button>
        </div>
      </Card>

      {/* Billing history */}
      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-app-border">
          <h2 className="font-semibold text-app-text">Billing history</h2>
        </div>
        {!isMock ? (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-app-muted mb-4">Invoices and receipts live in the Stripe billing portal.</p>
            <Button variant="secondary" size="sm" className="!rounded-lg" onClick={goToPortal} disabled={portalBusy}>
              {portalBusy ? "Opening…" : "View invoices"}
            </Button>
          </div>
        ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-app-border bg-app-inset text-left">
              <th className="px-5 py-3 text-xs font-medium text-app-muted">Date</th>
              <th className="px-5 py-3 text-xs font-medium text-app-muted">Description</th>
              <th className="px-5 py-3 text-xs font-medium text-app-muted">Amount</th>
              <th className="px-5 py-3 text-xs font-medium text-app-muted">Status</th>
              <th className="px-5 py-3 text-xs font-medium text-app-muted">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-app-border-faint">
            {MOCK_BILLING_HISTORY.map((row, i) => (
              <tr key={i} className="hover:bg-app-hover">
                <td className="px-5 py-3.5 text-app-muted">{row.date}</td>
                <td className="px-5 py-3.5 text-app-text">{row.description}</td>
                <td className="px-5 py-3.5 font-medium text-app-text tabular-nums">{row.amount}</td>
                <td className="px-5 py-3.5">
                  <Badge variant="success">{row.status}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <button className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-dark">
                    <ReceiptIcon className="h-3.5 w-3.5" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </Card>

      {/* Cancel */}
      {!cancelled && (
        <div className="text-center">
          <button
            onClick={() => setCancelModal(true)}
            className="text-sm text-app-faint hover:text-red-400 transition-colors"
          >
            Cancel subscription
          </button>
        </div>
      )}
      {cancelled && (
        <div className="text-center text-sm text-app-muted">
          Subscription cancelled. Protection stays active until end of billing period.
        </div>
      )}

      {/* Cancel modal */}
      <Modal open={cancelModal} onClose={() => setCancelModal(false)} title="Cancel subscription">
        <p className="text-app-muted text-sm mb-6">
          Are you sure? Your protection will stop at the end of your current billing period.
          You can resubscribe anytime.
        </p>
        <div className="flex gap-3">
          <Button
            variant="danger"
            size="md"
            className="flex-1 !rounded-lg"
            onClick={() => {
              if (isMock) {
                setCancelled(true);
                setCancelModal(false);
                toast.success("Subscription cancelled", "Protection stays active until the period ends.");
              } else {
                goToPortal();
              }
            }}
          >
            Cancel subscription
          </Button>
          <Button variant="secondary" size="md" className="!rounded-lg" onClick={() => setCancelModal(false)}>
            Keep my plan
          </Button>
        </div>
      </Modal>
    </div>
  );
}
