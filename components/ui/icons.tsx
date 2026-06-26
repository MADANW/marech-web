import { SVGProps } from "react";

/**
 * Shared stroke-icon set for the app portal. Consistent 24px grid,
 * 1.8 stroke, rounded joins. Use `className` for size + color
 * (color via `text-*`, since strokes use currentColor).
 */
type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function ShieldCheckIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5C8 19.3 5 15.5 5 11V6l7-3z" />
      <path d="M9 11.5l2 2 4-4" />
    </svg>
  );
}

export function ActivityIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 12h3l2.5-7 5 16 2.5-9H21" />
    </svg>
  );
}

export function BanIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function BotIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="4.5" y="8" width="15" height="11" rx="2.5" />
      <path d="M12 4.5V8M9 13h.01M15 13h.01M9 16h6" />
      <path d="M2.5 12.5v2M21.5 12.5v2" />
    </svg>
  );
}

export function TrendingUpIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M16 7h5v5" />
    </svg>
  );
}

export function TrendingDownIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 7l6 6 4-4 8 8" />
      <path d="M16 17h5v-5" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 12.5l5 5 11-11" />
    </svg>
  );
}

export function AlertTriangleIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 4l8.5 15h-17L12 4z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

export function OctagonAlertIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M8 3h8l5 5v8l-5 5H8l-5-5V8l5-5z" />
      <path d="M12 8v4M12 15h.01" />
    </svg>
  );
}

export function GiftIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 11h16v9H4z" />
      <path d="M12 11v9M3 7h18v4H3zM12 7S10 3.5 7.5 4.5 11 7 12 7zM12 7s2-3.5 4.5-2.5S13 7 12 7z" />
    </svg>
  );
}

export function ZapIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />
    </svg>
  );
}

export function GlobeIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 2.5 14.7 0 17M12 3.5c-2.5 2.3-2.5 14.7 0 17" />
    </svg>
  );
}

export function ClockIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function CodeIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M9 8l-5 4 5 4M15 8l5 4-5 4" />
    </svg>
  );
}

export function DownloadIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19h14" />
    </svg>
  );
}

export function PlusIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CreditCardIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M7 14.5h3" />
    </svg>
  );
}

export function ReceiptIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 3.5h12v17l-2.2-1.4L13.6 21 12 19.6 10.4 21l-2.2-1.9L6 20.5v-17z" />
      <path d="M9.5 8h5M9.5 11.5h5" />
    </svg>
  );
}

export function SearchIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

export function ChevronRightIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function ShieldPlusIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5C8 19.3 5 15.5 5 11V6l7-3z" />
      <path d="M12 8.5v5M9.5 11h5" />
    </svg>
  );
}

export function LockIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 018 0v2.5" />
    </svg>
  );
}

export function EyeIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

export function InboxIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 13l2.5-8h11L20 13v6H4v-6z" />
      <path d="M4 13h5l1 2.5h4L15 13h5" />
    </svg>
  );
}

export function SparklesIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z" />
      <path d="M18.5 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </svg>
  );
}
