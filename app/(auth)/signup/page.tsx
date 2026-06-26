"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Logo } from "@/components/marketing/Logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const PLATFORMS = ["Wix", "Squarespace", "Shopify", "WordPress", "Webflow", "Custom / Other"];
const INDUSTRIES = ["Blog", "E-commerce", "SaaS", "Portfolio", "Other"];

interface Step1 {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Step2 {
  websiteUrl: string;
  platform: string;
  industry: string;
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1 | null>(null);
  const router = useRouter();
  const { signUp } = useAuth();

  const step1 = useForm<Step1>();
  const step2 = useForm<Step2>({ defaultValues: { platform: PLATFORMS[0], industry: INDUSTRIES[0] } });

  const onStep1 = (data: Step1) => {
    if (data.password !== data.confirmPassword) {
      step1.setError("confirmPassword", { message: "Passwords don't match" });
      return;
    }
    setStep1Data(data);
    setStep(2);
  };

  const onStep2 = async (data: Step2) => {
    try {
      await signUp(step1Data!.email, step1Data!.password, data.websiteUrl, data.platform);
      router.push("/dashboard");
    } catch (err) {
      step2.setError("root", { message: (err as Error).message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex">
            <Logo className="text-xl" iconClassName="w-7 h-7" />
          </Link>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                  step > s
                    ? "bg-success/20 border border-success/50 text-success"
                    : step === s
                    ? "bg-accent/20 border border-accent/50 text-accent"
                    : "bg-white/5 border border-white/15 text-white/30"
                )}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 3 && <div className={cn("h-px w-8", step > s ? "bg-success/40" : "bg-white/10")} />}
            </div>
          ))}
        </div>

        <div className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-[0_6px_28px_rgba(0,0,0,0.4)]">
          {/* Step 1 */}
          {step === 1 && (
            <>
              <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-mono)" }}>Create your account</h1>
              <p className="text-white/50 text-sm mb-6">7-day free trial — no credit card needed</p>
              <div className="mb-5">
                <GoogleButton onError={(m) => step1.setError("email", { message: m })} />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/40">or sign up with email</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <form onSubmit={step1.handleSubmit(onStep1)} className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  error={step1.formState.errors.email?.message}
                  {...step1.register("email", { required: "Email is required" })}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Min. 8 characters"
                  error={step1.formState.errors.password?.message}
                  {...step1.register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                  })}
                />
                <Input
                  label="Confirm password"
                  type="password"
                  placeholder="••••••••"
                  error={step1.formState.errors.confirmPassword?.message}
                  {...step1.register("confirmPassword", { required: "Please confirm your password" })}
                />
                <Button type="submit" variant="accent" size="md" className="w-full mt-2">
                  Continue →
                </Button>
              </form>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <button onClick={() => setStep(1)} className="text-sm text-white/40 hover:text-white/70 mb-4 flex items-center gap-1 transition-colors">
                ← Back
              </button>
              <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-mono)" }}>Tell us about your site</h1>
              <p className="text-white/50 text-sm mb-6">We&apos;ll show you the right setup instructions</p>
              <form onSubmit={step2.handleSubmit(onStep2)} className="space-y-4">
                <Input
                  label="Website URL"
                  type="url"
                  placeholder="https://yoursite.com"
                  error={step2.formState.errors.websiteUrl?.message}
                  {...step2.register("websiteUrl", { required: "Website URL is required" })}
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-white/70">Platform</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-sm text-white focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none backdrop-blur-sm"
                    {...step2.register("platform")}
                  >
                    {PLATFORMS.map((p) => <option key={p} className="bg-gray-900 text-white">{p}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-white/70">Industry <span className="text-white/30">(optional)</span></label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-sm text-white focus:border-accent/50 focus:ring-2 focus:ring-accent/20 outline-none backdrop-blur-sm"
                    {...step2.register("industry")}
                  >
                    {INDUSTRIES.map((i) => <option key={i} className="bg-gray-900 text-white">{i}</option>)}
                  </select>
                </div>
                {step2.formState.errors.root && (
                  <p className="text-sm text-red-400 text-center">{step2.formState.errors.root.message}</p>
                )}
                <Button type="submit" variant="accent" size="md" className="w-full mt-2"
                  disabled={step2.formState.isSubmitting}>
                  {step2.formState.isSubmitting ? "Creating account…" : "Create Account →"}
                </Button>
              </form>
              {step1Data && (
                <p className="text-xs text-white/30 text-center mt-3">Signing up as {step1Data.email}</p>
              )}
            </>
          )}

          {/* Step 3 — email verification */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-mono)" }}>Check your email</h2>
              <p className="text-white/50 text-sm mb-4">
                We sent a verification link to <strong className="text-white/80">{step1Data?.email}</strong>
              </p>
              <p className="text-xs text-white/30">Redirecting to your dashboard in a moment…</p>
            </div>
          )}
        </div>

        {step < 3 && (
          <p className="text-center text-sm text-white/50 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-accent font-medium hover:text-accent-dark transition-colors">Log in</Link>
          </p>
        )}
      </div>
    </div>
  );
}
