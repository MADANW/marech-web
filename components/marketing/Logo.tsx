import { cn } from "@/lib/utils";

interface LogoProps {
  /** Sizing / color classes for the wordmark (e.g. "text-xl"). */
  className?: string;
  /** Classes for the icon image. */
  iconClassName?: string;
  /** Hide the icon and render the wordmark only. */
  hideIcon?: boolean;
}

const MONO = { fontFamily: "var(--font-mono)" } as const;

/**
 * Marech wordmark with a CSS-only glitch / "blocked" motif on hover.
 * Shared by the marketing nav, auth screens, and the portal sidebar.
 */
export function Logo({ className, iconClassName, hideIcon = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2">
      {!hideIcon && (
        <img
          src="/logos/marech-icon-color.svg"
          className={cn("w-5 h-5", iconClassName)}
          alt=""
        />
      )}
      <span
        className={cn("logo-glitch font-bold tracking-tight text-white text-base", className)}
        style={MONO}
      >
        <span className="logo-glitch__text">
          block<span className="text-accent">.me</span>
        </span>
        <span aria-hidden className="logo-glitch__layer logo-glitch__layer--a">
          Marech
        </span>
        <span aria-hidden className="logo-glitch__layer logo-glitch__layer--b">
          Marech
        </span>
        <span aria-hidden className="logo-glitch__bar" />
      </span>
    </span>
  );
}
