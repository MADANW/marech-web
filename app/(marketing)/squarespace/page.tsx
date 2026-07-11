import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Squarespace — Monitor AI Scrapers on Your Site",
};

export default function SquarespacePage() {
  return (
    <PlatformPage
      name="Squarespace"
      headline="Marech for Squarespace"
      subheadline="See exactly which AI scrapers are hitting your Squarespace site — monitoring in minutes, no code required."
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, click "Get Snippet Code" in your Marech dashboard and copy the script tag.',
        },
        {
          title: "Open Squarespace Admin",
          body: "Log in to your Squarespace account and go to your site editor.",
        },
        {
          title: "Go to Settings → Advanced → Code Injection",
          body: "In the left sidebar, click Settings, scroll to Advanced, then click Code Injection.",
        },
        {
          title: "Paste into the Header section",
          body: "In the Header field, paste your Marech snippet. This applies to every page automatically.",
        },
        {
          title: "Click Save",
          body: "Click Save. Monitoring is now live across your entire Squarespace site — scraper traffic will appear in your dashboard.",
        },
      ]}
      blocking={{
        canBlock: false,
        summary:
          "Squarespace hosts everything — server, domain, and TLS — so there's no way to insert an edge proxy or worker in front of it. On Squarespace, Marech monitors traffic and overlays JS-running bots, but non-JS scrapers can't be blocked. That's a platform limitation, stated honestly.",
      }}
    />
  );
}
