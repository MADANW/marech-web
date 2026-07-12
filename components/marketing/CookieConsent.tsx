"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { CookieIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  DEFAULT_CATEGORIES,
  useCookieConsent,
  type ConsentCategory,
} from "@/lib/cookie-consent";

interface CategoryMeta {
  key: ConsentCategory;
  label: string;
  description: string;
  /** Necessary is locked on. */
  locked?: boolean;
}

const CATEGORIES: CategoryMeta[] = [
  {
    key: "necessary",
    label: "Strictly necessary",
    description:
      "Required for the site to work — signing in, security, and remembering this choice. Always on.",
    locked: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    description:
      "Anonymous usage stats that help us understand what's working and improve Marech.",
  },
  {
    key: "marketing",
    label: "Marketing",
    description:
      "Lets us measure campaigns and show you relevant content about protecting your site.",
  },
];

/**
 * Site-wide cookie consent banner. Renders nothing until we've resolved the
 * stored decision on the client (avoids a hydration flash), then shows the
 * banner only when no valid choice exists for the current consent version.
 */
export function CookieConsent() {
  const { record, needsDecision, save, acceptAll, rejectAll } = useCookieConsent();
  const [showPrefs, setShowPrefs] = useState(false);
  const [choices, setChoices] = useState({ ...DEFAULT_CATEGORIES });
  const panelRef = useRef<HTMLDivElement>(null);

  // Seed the preference toggles from any existing record when the panel opens.
  useEffect(() => {
    if (showPrefs && record) setChoices({ ...record.categories });
  }, [showPrefs, record]);

  // Move focus to the panel when it expands, for keyboard users.
  useEffect(() => {
    if (showPrefs) panelRef.current?.focus();
  }, [showPrefs]);

  // `record === undefined` means not yet resolved on the client.
  if (record === undefined || !needsDecision) return null;

  const savePrefs = () => save(choices);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div
        className={cn(
          "mars-card--marketing pointer-events-auto w-full max-w-3xl rounded-2xl p-5 shadow-2xl backdrop-blur-md",
          "toast-enter"
        )}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mars-rust/15 text-mars-ember">
            <CookieIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="cookie-consent-title"
              className="text-sm font-semibold text-app-text"
            >
              We use cookies
            </h2>
            <p
              id="cookie-consent-desc"
              className="mt-1 text-[13px] leading-relaxed text-app-muted"
            >
              Marech uses cookies to keep the site running, understand how it's
              used, and improve your experience. You can accept all, reject
              non-essential, or choose what to allow. See our{" "}
              <Link
                href="/privacy"
                className="text-mars-ember underline underline-offset-2 hover:text-mars-rust"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {showPrefs && (
          <div
            ref={panelRef}
            tabIndex={-1}
            className="mt-4 space-y-3 border-t border-app-border pt-4 focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-app-text">
                    {cat.label}
                  </div>
                  <div className="mt-0.5 text-xs leading-relaxed text-app-muted">
                    {cat.description}
                  </div>
                </div>
                <div className="mt-0.5 shrink-0">
                  <Toggle
                    enabled={cat.locked ? true : choices[cat.key]}
                    disabled={cat.locked}
                    label={`${cat.label} cookies`}
                    onChange={(val) =>
                      setChoices((prev) => ({ ...prev, [cat.key]: val }))
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
          {showPrefs ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPrefs(false)}
              >
                Back
              </Button>
              <Button variant="primary" size="sm" onClick={savePrefs}>
                Save preferences
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-app-muted hover:text-app-text"
                onClick={() => setShowPrefs(true)}
              >
                Manage preferences
              </Button>
              <Button variant="secondary" size="sm" onClick={rejectAll}>
                Reject non-essential
              </Button>
              <Button variant="primary" size="sm" onClick={acceptAll}>
                Accept all
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
