"use client";
import { openCookieSettings } from "@/lib/cookie-consent";

/** Footer entry point that re-opens the cookie consent banner. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="hover:text-white transition-colors"
    >
      Cookie settings
    </button>
  );
}
