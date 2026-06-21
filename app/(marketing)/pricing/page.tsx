import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Pricing — BlockMe",
  description: "Simple, transparent pricing. Start free, upgrade when you're ready.",
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    limit: "1,000 requests/mo",
    sites: "1 website",
    cta: "Start Free",
    href: "/signup",
    highlight: false,
    features: ["Basic dashboard", "Email support (48hr)"],
  },
  {
    name: "Starter",
    price: "$10",
    period: "/month",
    limit: "100K requests/mo",
    sites: "3 websites",
    cta: "Start Free Trial",
    href: "/signup",
    highlight: true,
    features: ["Full dashboard", "Policy management", "CSV export", "Email support (24hr)"],
  },
  {
    name: "Pro",
    price: "$30",
    period: "/month",
    limit: "1M requests/mo",
    sites: "10 websites",
    cta: "Start Free Trial",
    href: "/signup",
    highlight: false,
    features: ["Everything in Starter", "Advanced analytics", "Real-time alerts", "API access", "Email + Chat support"],
  },
  {
    name: "Enterprise",
    price: "$100",
    period: "/month",
    limit: "Unlimited requests",
    sites: "Unlimited websites",
    cta: "Contact Sales",
    href: "mailto:hello@blockme.com",
    highlight: false,
    features: ["Everything in Pro", "Custom integration", "SLA guarantee", "Priority support", "Dedicated account manager"],
  },
];

const FAQS = [
  { q: "What happens if I exceed my monthly limit?", a: "We'll notify you when you're approaching your limit. Traffic continues uninterrupted — we'll never silently cut off your protection. You can upgrade anytime." },
  { q: "Can I cancel anytime?", a: "Yes. No contracts, no cancellation fees. Cancel from your dashboard in one click. Protection stays active until the end of your billing period." },
  { q: "Do you offer refunds?", a: "We offer a 14-day free trial so you can test before paying. If you're not satisfied in the first 30 days after your first payment, contact us for a full refund." },
  { q: "What counts as a 'request'?", a: "Each HTTP request to your website counts as one request. This includes page loads, API calls, and asset requests. Typical small blogs use under 50K/month." },
  { q: "Can I upgrade or downgrade my plan?", a: "Yes, anytime. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle." },
];

export default function PricingPage() {
  return (
    <div className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3" style={{ fontFamily: "var(--font-syne)" }}>Pricing</span>
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>Simple, transparent pricing.</h1>
          <p className="text-white/60 text-lg">Start free. No credit card required.</p>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 flex flex-col backdrop-blur-xl ${
                plan.highlight
                  ? "border-accent/40 bg-accent/10 shadow-xl shadow-accent/10 scale-105"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-semibold bg-accent text-white px-3 py-1 rounded-full self-start mb-4">
                  Most Popular
                </div>
              )}
              <div className="text-xs font-bold tracking-widest uppercase text-white/50 mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                {plan.name}
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>{plan.price}</span>
                <span className="text-sm mb-1 text-white/40">{plan.period}</span>
              </div>
              <div className="text-xs text-white/50 mb-1">{plan.limit}</div>
              <div className="text-xs text-white/40 mb-6">{plan.sites}</div>

              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckIcon className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                    <span className="text-white/70">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button variant={plan.highlight ? "accent" : "secondary"} size="md" className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10" style={{ fontFamily: "var(--font-syne)" }}>Common questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                <summary className="px-6 py-4 cursor-pointer font-medium text-white flex items-center justify-between hover:bg-white/5 transition-colors list-none">
                  {faq.q}
                  <ChevronIcon className="w-5 h-5 text-white/40 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}
