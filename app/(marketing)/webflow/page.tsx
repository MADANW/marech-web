import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Webflow — Monitor & Block AI Scrapers",
};

export default function WebflowPage() {
  return (
    <PlatformPage
      name="Webflow"
      headline="Marech for Webflow Sites"
      subheadline="One embed monitors AI-scraper traffic across every page — and if you front Webflow with Cloudflare, you can block scrapers at the edge too."
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
          body: "Click Save Changes, then Publish your site. Monitoring is now active on all pages and traffic will appear in your dashboard.",
        },
      ]}
      blocking={{
        canBlock: true,
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
      }}
    />
  );
}
