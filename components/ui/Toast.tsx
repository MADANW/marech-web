"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { CheckIcon, OctagonAlertIcon, ActivityIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** ms before auto-dismiss; 0 keeps it until dismissed. Default 4000. */
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastInput, "description">> {
  id: number;
  description?: string;
}

interface ToastContextValue {
  toast: (t: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_STYLES: Record<ToastVariant, { icon: typeof CheckIcon; tone: string }> = {
  success: { icon: CheckIcon, tone: "bg-success/15 text-success" },
  error: { icon: OctagonAlertIcon, tone: "bg-danger/15 text-red-400" },
  info: { icon: ActivityIcon, tone: "bg-mars-cyan/15 text-mars-cyan" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((t: ToastInput) => {
    const id = Date.now() + Math.random();
    const item: ToastItem = {
      id,
      title: t.title,
      description: t.description,
      variant: t.variant ?? "info",
      duration: t.duration ?? 4000,
    };
    setToasts((prev) => [...prev, item]);
  }, []);

  const value: ToastContextValue = {
    toast,
    success: (title, description) => toast({ title, description, variant: "success" }),
    error: (title, description) => toast({ title, description, variant: "error" }),
    info: (title, description) => toast({ title, description, variant: "info" }),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(92vw,360px)] flex-col gap-2"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const { icon: Icon, tone } = VARIANT_STYLES[toast.variant];

  const close = useCallback(() => {
    setLeaving(true);
    setTimeout(onDismiss, 180);
  }, [onDismiss]);

  useEffect(() => {
    if (toast.duration <= 0) return;
    const t = setTimeout(close, toast.duration);
    return () => clearTimeout(t);
  }, [toast.duration, close]);

  return (
    <div
      role="status"
      className={cn(
        "mars-card pointer-events-auto flex items-start gap-3 rounded-xl px-4 py-3 shadow-2xl transition-all duration-200",
        leaving ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100 toast-enter"
      )}
    >
      <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", tone)}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-app-text">{toast.title}</div>
        {toast.description && <div className="mt-0.5 text-xs text-app-muted">{toast.description}</div>}
      </div>
      <button
        onClick={close}
        aria-label="Dismiss"
        className="-mr-1 -mt-0.5 shrink-0 rounded p-1 text-app-faint transition-colors hover:text-app-text"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
