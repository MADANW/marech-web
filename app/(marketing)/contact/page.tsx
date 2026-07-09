import Link from "next/link";

export const metadata = {
  title: "Contact — Marech",
  description: "Get in touch with the Marech team — support, sales, and security.",
};

const PAD = "px-6 sm:px-10 lg:px-16";

const CHANNELS = [
  { label: "Support", body: "Setup help, billing, and account questions.", email: "mohamed@muhsinai.com" },
  { label: "Sales", body: "Enterprise plans, volume pricing, and custom integrations.", email: "mohamed@muhsinai.com" },
  { label: "Security", body: "Report a vulnerability or a security concern.", email: "mohamed@muhsinai.com" },
];

export default function ContactPage() {
  return (
    <div className="py-24">
      <div className={`${PAD} max-w-3xl mx-auto`}>
        <div className="mb-12">
          <span className="text-eyebrow text-mars-ember block mb-3">Contact</span>
          <h1 className="text-5xl font-bold text-white tracking-[-0.02em] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Get in touch
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Questions about setup or which integration fits your platform? We&apos;re happy to help.
            Most answers are already in the <Link href="/docs" className="text-accent hover:underline">docs</Link>.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {CHANNELS.map((c) => (
            <div key={c.label} className="mars-card--marketing rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-1">{c.label}</h2>
              <p className="text-sm text-white/55 leading-relaxed mb-4">{c.body}</p>
              <a href={`mailto:${c.email}`} className="text-sm text-accent hover:underline break-all">
                {c.email}
              </a>
            </div>
          ))}
        </div>

        <div className="mars-card--marketing rounded-xl p-5 text-sm text-white/60">
          Already a customer? Sign in and use the in-app help — your account context makes support
          faster. <Link href="/login" className="text-accent hover:underline">Log in →</Link>
        </div>
      </div>
    </div>
  );
}
