import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Duda — Monitor AI Scrapers on Your Duda Site",
  description:
    "Add one snippet to Duda's site-wide header code and see which AI scrapers are hitting your site in your dashboard. Step-by-step monitoring guide.",
};

export default function DudaPage() {
  return (
    <PlatformPage
      name="Duda"
      category="Hosted site builder"
      setupTime="~2 minutes"
      headline="Marech for Duda Sites"
      subheadline="Paste one snippet into Duda's site-wide header code and see exactly which AI scrapers are harvesting your content."
      overview={
        <>
          Duda&apos;s site-wide header HTML injects the monitoring snippet into every page at once,
          so setup is a single paste — ideal if you manage client sites at scale. Duda is a
          fully-hosted platform that owns the request path, so monitoring works everywhere, while
          non-JS scrapers can be observed rather than blocked.
        </>
      }
      snippetPlacement="Site Settings → Head HTML (site-wide)"
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, open your Marech dashboard and click "Get Snippet Code". Copy the one-line script tag.',
        },
        {
          title: "Open your Duda site editor",
          body: "Log in and open the site you want to protect in the Duda editor.",
        },
        {
          title: "Go to Settings → Head HTML",
          body: "Open the site's Settings and find the Head HTML (site-wide code) field. Depending on your Duda plan this may live under 'Site Settings → Head HTML' or the developer/HTML section.",
        },
        {
          title: "Paste your snippet into Head HTML",
          body: "Paste the Marech snippet into the site-wide Head HTML box so it loads inside <head> on every page.",
        },
        {
          title: "Republish your site",
          body: "Save and republish. Monitoring is now active across the whole site — traffic will appear in your dashboard.",
        },
      ]}
      verifyMonitoring={
        <>
          Site-wide Head HTML applies on the published site. Open any page in a browser and confirm
          your visit shows up in the dashboard feed. If it doesn&apos;t, make sure you republished
          after pasting.
        </>
      }
      blocking={{
        canBlock: false,
        method: "not available on Duda",
        summary:
          "Duda hosts everything — server, domain, and TLS — so there's no way to insert an edge proxy or worker in front of it. On Duda, Marech monitors traffic and overlays JS-running bots, but non-JS scrapers can't be blocked.",
      }}
      faq={[
        {
          q: "I manage many client sites on Duda — do I set this up per site?",
          a: "Yes, the snippet goes into each site's Head HTML, and each site gets its own Marech account/snippet so the dashboard data stays separated per client. Because it's a single paste per site, it's quick to roll out across a portfolio.",
        },
        {
          q: "Can I block scrapers on Duda?",
          a: "Not at the edge — Duda controls the full request path. You can add robots.txt directives that polite AI crawlers honor, but enforced blocking needs a platform where you control the edge. Use Marech's monitoring to quantify the problem first.",
        },
      ]}
    />
  );
}
