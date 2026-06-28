"use client";
import { useEffect, useState } from "react";
import { formatDate, formatTime, formatDateUTC, formatTimeUTC } from "@/lib/utils";

interface LocalTimeProps {
  ts: string | number | Date;
  /** "time" → HH:MM, "date" → Mon D, YYYY. Default "time". */
  mode?: "time" | "date";
  className?: string;
}

/**
 * Renders a timestamp in the viewer's local timezone.
 *
 * The server has no access to the client's timezone, so it (and the first
 * client paint) render a deterministic UTC value; after mount we swap to the
 * local-formatted value. suppressHydrationWarning covers the expected
 * first-paint text difference.
 */
export function LocalTime({ ts, mode = "time", className }: LocalTimeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const text = mounted
    ? mode === "date"
      ? formatDate(ts)
      : formatTime(ts)
    : mode === "date"
      ? formatDateUTC(ts)
      : formatTimeUTC(ts);

  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}
