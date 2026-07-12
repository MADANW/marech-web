import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Wix — Monitor AI Scrapers on Your Wix Site",
  description:
    "Add one line of code and see the AI scrapers hitting your Wix site in your dashboard — no developer needed. Step-by-step monitoring guide.",
};

export default function WixPage() {
  return (
    <PlatformPage
      name="Wix"
      category="Hosted site builder"
      setupTime="~2 minutes"
      headline="Marech for Wix Users"
      subheadline="Add one line of code and see the AI scrapers hitting your Wix site in your dashboard — no developer needed."
      overview={
        <>
          Wix&apos;s Custom Code panel lets you add the monitoring snippet to every page without
          touching a developer tool — you&apos;ll see exactly which AI bots hit your site. Wix is a
          fully-managed platform, so it owns the whole request path; that means monitoring works
          great, but scrapers can only be observed, not blocked.
        </>
      }
      snippetPlacement="Settings → Custom Code → Add Custom Code (Head, All pages)"
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, go to your dashboard and click "Get Snippet Code". Copy the one-line script tag.',
        },
        {
          title: "Open Wix Editor",
          body: "Log in to your Wix account and open your site in the Wix Editor.",
        },
        {
          title: "Go to Settings → Custom Code",
          body: "In the left menu, click Settings, then scroll down to find Custom Code.",
        },
        {
          title: "Click 'Add Custom Code'",
          body: "Click the + Add Custom Code button. A dialog box will appear.",
        },
        {
          title: "Choose 'Head' and 'All pages'",
          body: "Set the code location to Head and apply it to All Pages so every page is monitored.",
        },
        {
          title: "Name it, paste, and Apply",
          body: "Paste the code you copied in step 1, give it a name like 'Marech', and click Apply. Traffic will start showing up in your dashboard.",
        },
      ]}
      verifyMonitoring={
        <>
          Custom Code runs on your published Wix site, not the Editor preview. Publish, open the
          live URL in a browser, and confirm your visit appears in the dashboard feed.
        </>
      }
      blocking={{
        canBlock: false,
        method: "not available on Wix",
        summary:
          "Wix owns the entire request path — server, domain, and TLS — so you can't put an edge proxy or worker in front of it. On Wix, Marech monitors traffic and overlays JS-running bots, but non-JS scrapers can't be blocked. That's a platform limitation, stated honestly.",
      }}
      faq={[
        {
          q: "Is there any way to block scrapers on Wix?",
          a: "Not truly. You can add AI-crawler directives to your robots.txt, which the well-behaved crawlers (GPTBot, ClaudeBot…) honor — but a determined scraper ignores robots.txt, and Wix doesn't let you run an edge check to enforce anything. For real blocking you'd need to host on a platform where you control the edge.",
        },
        {
          q: "Then what's the point of monitoring on Wix?",
          a: "Knowing which AI companies are harvesting your content — and how aggressively — is the first step. Many people use the Wix monitoring data to decide whether it's worth moving to a setup where they can block.",
        },
      ]}
    />
  );
}
