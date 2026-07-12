"use client";
import { useCallback, useEffect, useState } from "react";

/**
 * Cookie consent storage + subscription. Consent lives in localStorage so it
 * survives across visits; a tiny pub-sub lets any component (the banner, an
 * analytics gate) react to changes without prop drilling.
 */

export const CONSENT_STORAGE_KEY = "marech.cookie-consent";
/** Bump when the set of categories or their meaning changes — a mismatched
 *  version is treated as "no decision yet" so the banner re-prompts. */
export const CONSENT_VERSION = 1;

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentCategories = Record<ConsentCategory, boolean>;

export interface ConsentRecord {
  version: number;
  /** ISO timestamp of when the choice was made. */
  updatedAt: string;
  categories: ConsentCategories;
}

/** Necessary cookies are required for the site to function and cannot be
 *  toggled off. Optional categories default to off (opt-in). */
export const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export const ACCEPT_ALL: ConsentCategories = {
  necessary: true,
  analytics: true,
  marketing: true,
};

const listeners = new Set<(record: ConsentRecord | null) => void>();
const openListeners = new Set<() => void>();

/**
 * Re-open the consent banner so a user can revisit a decision they've already
 * made — e.g. from a "Cookie settings" footer link. Safe to call from any
 * client component.
 */
export function openCookieSettings(): void {
  openListeners.forEach((fn) => fn());
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readConsent(): ConsentRecord | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (!parsed || parsed.version !== CONSENT_VERSION || !parsed.categories) {
      return null;
    }
    // Necessary is always on regardless of what was persisted.
    parsed.categories.necessary = true;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentCategories): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    categories: { ...categories, necessary: true },
  };
  if (isBrowser()) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* storage may be unavailable (private mode, quota) — fail silently */
    }
  }
  listeners.forEach((fn) => fn(record));
  return record;
}

/**
 * Reactive access to the stored consent. `record` is `undefined` until the
 * first client render resolves it (so SSR and hydration agree on "unknown"),
 * then `null` when no decision has been made, or the stored record.
 */
export function useCookieConsent() {
  const [record, setRecord] = useState<ConsentRecord | null | undefined>(undefined);
  /** Set when the user explicitly re-opens settings after already deciding. */
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    setRecord(readConsent());
    const listener = (next: ConsentRecord | null) => setRecord(next);
    listeners.add(listener);
    const openListener = () => setReopened(true);
    openListeners.add(openListener);
    // Keep multiple tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) setRecord(readConsent());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      openListeners.delete(openListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const save = useCallback((categories: ConsentCategories) => {
    setRecord(writeConsent(categories));
    setReopened(false);
  }, []);

  return {
    /** undefined = not yet resolved, null = no choice made, record = decided */
    record,
    /** True when the banner should be visible: no stored choice, or re-opened. */
    needsDecision: record === null || reopened,
    save,
    acceptAll: useCallback(() => {
      setRecord(writeConsent(ACCEPT_ALL));
      setReopened(false);
    }, []),
    rejectAll: useCallback(() => {
      setRecord(writeConsent(DEFAULT_CATEGORIES));
      setReopened(false);
    }, []),
  };
}
