import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Webflow — Monitor & Block AI Scrapers",
  description:
    "One embed monitors AI-scraper traffic across every Webflow page — and if you front Webflow with Cloudflare, you can block scrapers at the edge too.",
};

export default function WebflowPage() {
  return (
    <PlatformPage
      name="Webflow"
      category="Hosted site builder"
      setupTime="~2 minutes"
      headline="Marech for Webflow Sites"
      subheadline="One embed monitors AI-scraper traffic across every page — and if you front Webflow with Cloudflare, you can block scrapers at the edge too."
      overview={
        <>
          Webflow&apos;s site-wide custom code makes monitoring a one-paste job — the snippet lands
          in the <code>&lt;head&gt;</code> of every page automatically. On Webflow&apos;s own hosting
          that&apos;s as far as it goes, but if you point your domain through Cloudflare you can add
          a Worker that blocks scrapers before they reach Webflow.
        </>
      }
      snippetPlacement="Site Settings → Custom Code → Head Code"
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, go to your Marech dashboard and click "Get Snippet Code". Copy the script tag.',
        },
        {
          title: "Open your Webflow project",
          body: "Log in to Webflow and open the Designer for your site.",
        },
        {
          title: "Go to Site Settings → Custom Code",
          body: "Click the gear icon in the top-left, then choose the Custom Code tab.",
        },
        {
          title: "Paste into the Head Code section",
          body: "In the 'Head Code' field, paste your Marech snippet. This applies it to every page automatically.",
        },
        {
          title: "Save and Publish",
          body: "Click Save Changes, then Publish your site. Custom code only goes live on publish, so don't skip this step.",
        },
      ]}
      verifyMonitoring={
        <>
          Custom code runs on the <span className="text-white/80">published</span> site, not the
          Designer preview — open your live URL in a browser and watch the visit land in your
          dashboard. If nothing appears, confirm you clicked Publish after saving.
        </>
      }
      blocking={{
        canBlock: true,
        method: "a Cloudflare Worker at the edge",
        summary:
          "On Webflow's own hosting the snippet can only monitor. To actually block non-JS scrapers, front your Webflow site with Cloudflare and run the BlockMe Worker at the edge — it checks each request before it reaches Webflow.",
        docsHref: "https://github.com/MADANW/marech-BD/tree/main/integrations/cloudflare",
        steps: [
          {
            title: "Route your domain through Cloudflare",
            body: "Add your custom domain to Cloudflare and set the Webflow DNS records to Proxied (orange cloud) so requests pass through Cloudflare's edge first.",
          },
          {
            title: "Create an API key and a block policy",
            body: "In the Marech dashboard, create an API key (shown once — copy it) and add a block policy (e.g. bot types scraper and ai_tool).",
          },
          {
            title: "Deploy the BlockMe Cloudflare Worker",
            body: "Follow the Cloudflare integration guide to deploy the Worker with your API key and API URL, routed to your domain. Scrapers get a 403 before reaching Webflow; it fails open on any outage.",
          },
        ],
        verify: {
          cmd: 'curl -A "GPTBot/1.0" -I https://yoursite.com/',
          expect:
            "With the Worker live, a fake GPTBot request returns a 403 while a normal browser loads your published Webflow site.",
        },
      }}
      faq={[
        {
          q: "Can I block without Cloudflare?",
          a: "Not on Webflow hosting alone — Webflow serves the HTML directly, so there's no place to insert a check. Fronting the site with Cloudflare (free plan is fine) gives you an edge you control, which is where the Worker runs.",
        },
        {
          q: "Does the snippet work on Webflow's free .webflow.io domain?",
          a: "Monitoring works on any Webflow domain. Blocking needs a custom domain you can route through Cloudflare, which isn't possible on the free *.webflow.io subdomain.",
        },
      ]}
    />
  );
}
