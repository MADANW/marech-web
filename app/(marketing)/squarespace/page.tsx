import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Squarespace — Monitor AI Scrapers on Your Site",
  description:
    "See exactly which AI scrapers are hitting your Squarespace site — monitoring in minutes, no code required. Step-by-step Code Injection guide.",
};

export default function SquarespacePage() {
  return (
    <PlatformPage
      name="Squarespace"
      category="Hosted site builder"
      setupTime="~2 minutes"
      headline="Marech for Squarespace"
      subheadline="See exactly which AI scrapers are hitting your Squarespace site — monitoring in minutes, no code required."
      overview={
        <>
          Squarespace&apos;s Code Injection drops the snippet into the header of every page, so
          monitoring takes a single paste and no code editing. Squarespace hosts everything itself,
          which means it owns the request path — great for monitoring, but scrapers can be observed
          rather than blocked.
        </>
      }
      snippetPlacement="Settings → Advanced → Code Injection → Header"
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
      verifyMonitoring={
        <>
          Code Injection applies on the live site. Open any page in a browser and confirm your visit
          shows up in the dashboard feed. Note: Code Injection requires a paid Squarespace plan.
        </>
      }
      blocking={{
        canBlock: false,
        method: "not available on Squarespace",
        summary:
          "Squarespace hosts everything — server, domain, and TLS — so there's no way to insert an edge proxy or worker in front of it. On Squarespace, Marech monitors traffic and overlays JS-running bots, but non-JS scrapers can't be blocked. That's a platform limitation, stated honestly.",
      }}
      faq={[
        {
          q: "Can I block AI crawlers on Squarespace at all?",
          a: "Only advisorily. Squarespace lets you edit robots.txt directives that polite crawlers honor, but there's no way to run an enforcement check at the edge, so a scraper that ignores robots.txt can't be stopped. Real blocking needs a platform where you control the request path.",
        },
        {
          q: "Which Squarespace plan do I need?",
          a: "Code Injection (where the snippet goes) is available on Squarespace's paid Business and Commerce plans. Monitoring works on any of those; the Personal plan historically doesn't expose Code Injection.",
        },
      ]}
    />
  );
}
