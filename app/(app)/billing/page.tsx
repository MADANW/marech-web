"use client";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/lib/auth";
import { MOCK_BILLING_HISTORY } from "@/lib/mock";
import { formatNumber } from "@/lib/utils";
import { isMock, openBillingPortal } from "@/lib/api";

const PLAN_NAMES: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  enterprise: "Enterprise",
};

const PLAN_PRICES: Record<string, string> = {
  free: "$0",
  starter: "$10",
  pro: "$30",
  enterprise: "$100",
};

export default function BillingPage() {
  const { user } = useAuth();
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
    }
  };

  if (!user) return null;

  const usagePct = Math.min((user.usageThisMonth / user.planLimit) * 100, 100);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Billing</h1>

      {/* Current plan */}
      <Card padding="md">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900 mb-1">
              {PLAN_NAMES[user.plan]} Plan — {PLAN_PRICES[user.plan]}/month
            </h2>
            <Badge variant={user.status === "active" ? "success" : user.status === "trial" ? "primary" : "danger"}>
              {user.status === "trial" ? `Trial · ${user.trialDaysLeft} days left` : user.status}
            </Badge>
          </div>
          <Link href="/pricing">
            <Button variant="secondary" size="sm">Upgrade Plan</Button>
          </Link>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Usage this month</span>
            <span className="font-medium text-gray-900">
              {formatNumber(user.usageThisMonth)} / {formatNumber(user.planLimit)} requests
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${usagePct > 90 ? "bg-danger" : usagePct > 70 ? "bg-warning" : "bg-primary"}`}
              style={{ width: `${usagePct}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1 text-right">{usagePct.toFixed(0)}% used</div>
        </div>
      </Card>

      {/* Payment method */}
      <Card padding="md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Payment Method</h2>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 px-3 py-1.5 rounded text-xs font-mono font-bold text-gray-700">VISA</div>
              <div className="text-sm text-gray-700">•••• 1234</div>
              <div className="text-sm text-gray-400">Expires 12/25</div>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={goToPortal} disabled={portalBusy}>
            {portalBusy ? "Opening…" : "Update Card"}
          </Button>
        </div>
      </Card>

      {/* Billing history */}
      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Billing History</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_BILLING_HISTORY.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-gray-600">{row.date}</td>
                <td className="px-5 py-3 text-gray-700">{row.description}</td>
                <td className="px-5 py-3 font-medium text-gray-900">{row.amount}</td>
                <td className="px-5 py-3">
                  <Badge variant="success">{row.status}</Badge>
                </td>
                <td className="px-5 py-3">
                  <button className="text-xs text-primary hover:underline">PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Cancel */}
      {!cancelled && (
        <div className="text-center">
          <button
            onClick={() => setCancelModal(true)}
            className="text-sm text-gray-400 hover:text-danger transition-colors"
          >
            Cancel subscription
          </button>
        </div>
      )}
      {cancelled && (
        <div className="text-center text-sm text-gray-500">
          Subscription cancelled. Protection stays active until end of billing period.
        </div>
      )}

      {/* Cancel modal */}
      <Modal open={cancelModal} onClose={() => setCancelModal(false)} title="Cancel Subscription">
        <p className="text-gray-600 text-sm mb-6">
          Are you sure? Your protection will stop at the end of your current billing period.
          You can resubscribe anytime.
        </p>
        <div className="flex gap-3">
          <Button
            variant="danger"
            size="md"
            className="flex-1"
            onClick={() => {
              if (isMock) {
                setCancelled(true);
                setCancelModal(false);
              } else {
                goToPortal();
              }
            }}
          >
            Cancel Subscription
          </Button>
          <Button variant="secondary" size="md" onClick={() => setCancelModal(false)}>
            Keep My Plan
          </Button>
        </div>
      </Modal>
    </div>
  );
}
