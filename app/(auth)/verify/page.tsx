"use client";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/marketing/Logo";
import { verifyEmail, resendVerification } from "@/lib/api";

type State = "verifying" | "success" | "error";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [state, setState] = useState<State>("verifying");
  const [error, setError] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return; // React strict mode double-invokes effects; the token is single-use
    attempted.current = true;
    if (!token) {
      setError("This verification link is missing its token.");
      setState("error");
      return;
    }
    verifyEmail(token)
      .then(() => setState("success"))
      .catch((err) => {
        setError((err as Error).message);
        setState("error");
      });
  }, [token]);

  const onResend = async () => {
    if (!resendEmail) return;
    setResendState("sending");
    try {
      await resendVerification(resendEmail);
      setResendState("sent");
    } catch {
      setResendState("idle");
      setError("Could not resend — please wait a few minutes and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex">
            <Logo className="text-xl" iconClassName="w-7 h-7" />
          </Link>
        </div>

        <div className="mars-card--marketing rounded-2xl p-8 text-center">
          {state === "verifying" && (
            <>
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-white mb-2">Verifying your email…</h1>
              <p className="text-white/50 text-sm">This only takes a second.</p>
            </>
          )}

          {state === "success" && (
            <>
              <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-white mb-2">Email verified</h1>
              <p className="text-white/50 text-sm mb-6">
                Your account is active — protection is now live on your site.
              </p>
              <Link href="/dashboard">
                <Button variant="accent" size="md" className="w-full">Go to dashboard →</Button>
              </Link>
            </>
          )}

          {state === "error" && (
            <>
              <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-white mb-2">Verification failed</h1>
              <p className="text-white/50 text-sm mb-6">{error || "The link may have expired (links last 24 hours)."}</p>

              {resendState === "sent" ? (
                <p className="text-sm text-success">
                  If that account exists and is unverified, a new link is on its way.
                </p>
              ) : (
                <div className="space-y-3 text-left">
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                  />
                  <Button
                    variant="accent"
                    size="md"
                    className="w-full"
                    disabled={resendState === "sending" || !resendEmail}
                    onClick={onResend}
                  >
                    {resendState === "sending" ? "Sending…" : "Send a new link"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        <p className="text-center text-sm text-white/50 mt-6">
          Already verified?{" "}
          <Link href="/login" className="text-accent font-medium hover:text-accent-dark transition-colors">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  // useSearchParams requires a Suspense boundary so the rest of the route can prerender.
  return (
    <Suspense fallback={null}>
      <VerifyContent />
    </Suspense>
  );
}
