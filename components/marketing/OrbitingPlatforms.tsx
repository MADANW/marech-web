import Link from "next/link";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { type ReactNode } from "react";

const INNER = [
  { name: "Wix",       href: "/wix",       icon: <img src="/logos/platforms/wix.svg"       className="w-7 h-7 object-contain" alt="Wix" /> },
  { name: "Shopify",   href: "/shopify",   icon: <img src="/logos/platforms/shopify.svg"   className="w-7 h-7 object-contain" alt="Shopify" /> },
  { name: "WordPress", href: "/wordpress", icon: <img src="/logos/platforms/wordpress.svg" className="w-7 h-7 object-contain" alt="WordPress" /> },
];

const OUTER = [
  { name: "Squarespace", href: "/squarespace", icon: <img src="/logos/platforms/squarespace.svg" className="w-7 h-7 object-contain" alt="Squarespace" /> },
  { name: "Webflow",     href: "/webflow",     icon: <img src="/logos/platforms/webflow.svg"     className="w-7 h-7 object-contain" alt="Webflow" /> },
  { name: "Ghost",       href: "/ghost",       icon: <img src="/logos/platforms/ghost.svg"       className="w-7 h-7 object-contain" alt="Ghost" /> },
  { name: "HTML5",       href: "/html",        icon: <img src="/logos/platforms/html5.svg"       className="w-7 h-7 object-contain" alt="HTML5" /> },
];

function PlatformIcon({ name, href, icon }: { name: string; href: string; icon: ReactNode }) {
  return (
    <Link href={href} title={name} className="block pointer-events-auto">
      <div className="w-12 h-12 rounded-full bg-black/80 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:border-accent/60 hover:scale-110 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
        {icon}
      </div>
    </Link>
  );
}

export function OrbitingPlatforms() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-1">
        <span className="text-eyebrow text-mars-ember block mb-2">Integrations</span>
        <h3 className="text-2xl font-semibold text-white leading-snug">
          Compatible with every platform
        </h3>
        <p className="text-white/50 text-sm mt-2">
          Tap any platform below to see the setup guide.
        </p>
      </div>

      <div className="relative h-[440px] w-full overflow-hidden">
        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-black/60 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(226,86,42,0.3),0_0_80px_rgba(226,86,42,0.1)]">
            <img src="/logos/marech-icon-color.svg" className="w-14 h-14" alt="Marech" />
          </div>
        </div>

        {/* Inner orbit */}
        <OrbitingCircles radius={100} duration={32} iconSize={52}>
          {INNER.map((p) => (
            <PlatformIcon key={p.name} name={p.name} href={p.href} icon={p.icon} />
          ))}
        </OrbitingCircles>

        {/* Outer orbit */}
        <OrbitingCircles radius={155} duration={52} reverse iconSize={52}>
          {OUTER.map((p) => (
            <PlatformIcon key={p.name} name={p.name} href={p.href} icon={p.icon} />
          ))}
        </OrbitingCircles>
      </div>
    </div>
  );
}

