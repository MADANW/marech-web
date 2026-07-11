import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Ghost — Monitor & Block AI Scrapers",
};

export default function GhostPage() {
  return (
    <PlatformPage
      name="Ghost"
      headline="Marech for Ghost Blogs"
      subheadline="Injected once into your theme, the snippet monitors every page and post — and a Cloudflare-fronted Ghost site can block scrapers at the edge too."
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, open your Marech dashboard and click "Get Snippet Code". Copy the script tag.',
        },
        {
          title: "Open Ghost Admin",
          body: "Log in to your Ghost Admin panel (yourdomain.com/ghost).",
        },
        {
          title: "Go to Settings → Code injection",
          body: "In the left sidebar click Settings, then scroll to Advanced and open Code injection.",
        },
        {
          title: "Paste into the Site Header field",
          body: "Paste your Marech snippet into the Site Header box. This injects it into the <head> of every page and post.",
        },
        {
          title: "Click Save",
          body: "Hit Save. Monitoring is now live across your entire Ghost publication — scraper traffic will appear in your dashboard.",
        },
      ]}
      blocking={{
        canBlock: true,
        summary:
          "Ghost's Code injection only lets you add the monitoring snippet. To actually block non-JS scrapers, front your Ghost site with Cloudflare and run the BlockMe Worker at the edge — it checks each request before it reaches Ghost.",
        docsHref: "https://github.com/MADANW/marech-BD/tree/main/integrations/cloudflare",
        steps: [
          {
            title: "Route your domain through Cloudflare",
            body: "Add your custom domain to Cloudflare and set your Ghost DNS records to Proxied (orange cloud) so requests pass through Cloudflare's edge first.",
          },
          {
            title: "Create an API key and a block policy",
            body: "In the Marech dashboard, create an API key (shown once — copy it) and add a block policy (e.g. bot types scraper and ai_tool).",
          },
          {
            title: "Deploy the BlockMe Cloudflare Worker",
            body: "Follow the Cloudflare integration guide to deploy the Worker with your API key and API URL, routed to your domain. Scrapers get a 403 before reaching Ghost; it fails open on any outage.",
          },
        ],
      }}
    />
  );
}
