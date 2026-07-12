import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Shopify — Protect Your Store from AI Scrapers",
};

export default function ShopifyPage() {
  return (
    <PlatformPage
      name="Shopify"
      headline="Marech for Shopify Stores"
      subheadline="See which AI bots are scraping your product descriptions and prices — and block them for real if your store runs on a custom domain."
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'Sign up and grab your unique script tag from the dashboard under "Get Snippet Code".',
        },
        {
          title: "Go to Shopify Admin → Online Store → Themes",
          body: "In your Shopify admin panel, navigate to Online Store, then click Themes.",
        },
        {
          title: "Click the three dots → Edit code",
          body: "Next to your active theme, click the three-dot menu and select Edit code.",
        },
        {
          title: "Open theme.liquid",
          body: "In the Layout folder, click on theme.liquid to open the main template file.",
        },
        {
          title: "Paste snippet inside <head>",
          body: "Find the closing </head> tag and paste your Marech snippet just before it.",
        },
        {
          title: "Save",
          body: "Click Save. Monitoring is now active across your storefront — product pages, collections, and all — and traffic starts appearing in your dashboard.",
        },
      ]}
      blocking={{
        canBlock: true,
        summary:
          "Shopify is fully hosted, so the snippet alone can only monitor. If your store uses a custom domain (not *.myshopify.com), you can get real blocking by routing that domain through Cloudflare and running the BlockMe Worker at the edge.",
        docsHref: "https://github.com/MADANW/marech-BD/tree/main/integrations/shopify",
        steps: [
          {
            title: "Route your custom domain through Cloudflare",
            body: "Add your store's custom domain to Cloudflare and set the DNS records that point at Shopify to Proxied (orange cloud). This only works on a custom domain — not a *.myshopify.com address.",
          },
          {
            title: "Create an API key and a block policy",
            body: "In the Marech dashboard, create an API key (shown once — copy it) and add a block policy (e.g. bot types scraper and ai_tool).",
          },
          {
            title: "Deploy the BlockMe Cloudflare Worker",
            body: "Follow the Shopify integration guide to deploy the Worker with your API key and API URL, routed to your store domain. It checks each request before it reaches Shopify and returns a 403 to scrapers (failing open on any outage).",
          },
          {
            title: "Optional: add robots.txt.liquid",
            body: "Add the provided robots.txt.liquid template to also ask well-behaved AI crawlers (GPTBot, ClaudeBot…) not to crawl. It won't stop a determined scraper, but the major crawlers honor it.",
          },
        ],
      }}
    />
  );
}
