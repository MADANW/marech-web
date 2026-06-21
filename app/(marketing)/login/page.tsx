"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <img src="/logos/blockme-icon-color.svg" className="w-7 h-7" alt="" />
            <span className="font-bold text-white text-xl" style={{ fontFamily: "var(--font-syne)" }}>BlockMe</span>
          </Link>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Welcome back</h1>
          <p className="text-white/50 text-sm mt-1">Log in to your dashboard</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {error && (
            <div className="bg-danger/15 border border-danger/30 text-danger text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password", { required: "Password is required" })}
              />
              <div className="text-right mt-1">
                <Link href="/forgot-password" className="text-xs text-accent hover:text-accent-dark transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              variant="accent"
              size="md"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in…" : "Log In"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-white/50 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-accent font-medium hover:text-accent-dark transition-colors">
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
