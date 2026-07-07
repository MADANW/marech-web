"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { isMock, startCheckout } from "@/lib/api";
import type { Plan } from "@/lib/mock";

/**
 * Auth-aware pricing call-to-action.
 *
 * The pricing grid is a static (SEO-friendly) server component, but the CTA
 * needs to know who's signed in: a logged-in visitor picking a paid plan
 * should go straight to Stripe Checkout, not get bounced back through signup.
 */
export function PlanCta({
  planId,
  cta,
  highlight,
}: {
  planId: Plan;
  cta: string;
  highlight: boolean;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const variant = highlight ? "accent" : "secondary";

  // Free plan: nothing to pay for. Existing users land on their dashboard;
  // everyone else signs up.
  if (planId === "free") {
    return (
      <Link href={user ? "/dashboard" : "/signup"} className="block">
        <Button variant={variant} size="md" className="w-full">{cta}</Button>
      </Link>
    );
  }

  // Paid, self-serve plans (Starter / Pro / Enterprise).
  const subscribe = async () => {
    // Not signed in yet: carry the chosen plan through signup so checkout can
    // resume the moment the account exists — no bounce back to pricing.
    if (!user) {
      router.push(`/signup?plan=${planId}`);
      return;
    }
    // Demo mode can't reach real Stripe; show what the flow manages instead.
    if (isMock) {
      router.push("/billing");
      return;
    }
    // Already signed in: go straight to Stripe Checkout for this plan.
    setError(null);
    setBusy(true);
    try {
      const { url } = await startCheckout(planId);
      window.location.href = url;
    } catch {
      setBusy(false);
      setError("Couldn't start checkout — please try again.");
    }
  };

  return (
    <div>
      <Button variant={variant} size="md" className="w-full" onClick={subscribe} disabled={busy}>
        {busy ? "Redirecting…" : cta}
      </Button>
      {error && <p className="text-xs text-red-400 mt-2 text-center">{error}</p>}
    </div>
  );
}
