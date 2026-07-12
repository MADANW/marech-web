import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Framer — Monitor AI Scrapers on Your Framer Site",
  description:
    "Add one line of custom code and see which AI scrapers are hitting your Framer site in your dashboard. Step-by-step monitoring guide.",
};

export default function FramerPage() {
  return (
    <PlatformPage
      name="Framer"
      category="Hosted site builder"
      setupTime="~2 minutes"
      headline="Marech for Framer Sites"
      subheadline="Drop one snippet into Framer's custom code and watch the AI scrapers hitting your site appear in your dashboard — no developer needed."
      overview={
        <>
          Framer&apos;s custom-code panel injects the monitoring snippet into the{" "}
          <code>&lt;head&gt;</code> of every published page, so setup is a single paste. Framer hosts
          and serves your site on its own managed infrastructure — great for monitoring, but because
          it owns the request path and manages SSL, scrapers can be observed rather than blocked.
        </>
      }
      snippetPlacement="Site Settings → General → Custom Code → Start of <head> tag"
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, open your Marech dashboard and click "Get Snippet Code". Copy the one-line script tag.',
        },
        {
          title: "Open your Framer project settings",
          body: "In the Framer editor, open Site Settings (the gear/settings icon for the whole site, not a single page).",
        },
        {
          title: "Go to General → Custom Code",
          body: "Find the Custom Code section. You'll see fields for 'Start of <head> tag' and 'End of <body> tag'.",
        },
        {
          title: "Paste into 'Start of <head> tag'",
          body: "Paste your Marech snippet into the 'Start of <head> tag' field so it loads on every page.",
        },
        {
          title: "Publish your site",
          body: "Click Publish. Custom code only goes live on the published site, so monitoring starts once you publish.",
        },
      ]}
      verifyMonitoring={
        <>
          Custom code runs on your <span className="text-white/80">published</span> Framer site, not
          the editor preview. Open the live URL in a browser and confirm your visit appears in the
          dashboard feed.
        </>
      }
      blocking={{
        canBlock: false,
        method: "not available on Framer hosting",
        summary:
          "Framer hosts your site and manages its own domain routing and SSL, so there's no place to insert an edge proxy or worker that runs before your page is served. On Framer, Marech monitors traffic and overlays JS-running bots, but non-JS scrapers can't be blocked.",
      }}
      faq={[
        {
          q: "Can I block scrapers by putting Cloudflare in front of Framer?",
          a: "It's not officially supported. Framer manages your domain's SSL and expects its own DNS setup, so proxying through Cloudflare (which is where an edge Worker would run) tends to conflict with Framer's certificate handling. For reliable blocking, use a platform where you fully control the edge.",
        },
        {
          q: "Is there anything I can do besides monitor?",
          a: "You can add AI-crawler directives to your robots.txt, which well-behaved crawlers like GPTBot and ClaudeBot honor. It won't stop a scraper that ignores robots.txt, but combined with monitoring it gives you visibility plus a polite opt-out signal.",
        },
      ]}
    />
  );
}
