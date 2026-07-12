import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Shopify — Protect Your Store from AI Scrapers",
  description:
    "See which AI bots scrape your Shopify product pages and prices — and block them for real on a custom domain via Cloudflare. Step-by-step setup guide.",
};

export default function ShopifyPage() {
  return (
    <PlatformPage
      name="Shopify"
      category="Hosted e-commerce"
      setupTime="~3 minutes"
      headline="Marech for Shopify Stores"
      subheadline="See which AI bots are scraping your product descriptions and prices — and block them for real if your store runs on a custom domain."
      overview={
        <>
          Shopify is fully hosted, so the snippet alone monitors your storefront — product pages,
          collections, and all. If your store is on a custom domain (not{" "}
          <code>*.myshopify.com</code>), you can also route it through Cloudflare and block scrapers
          at the edge, before they ever reach Shopify.
        </>
      }
      snippetPlacement="Online Store → Themes → Edit code → theme.liquid"
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'Sign up and grab your unique script tag from the dashboard under "Get Snippet Code".',
        },
        {
          title: "Go to Online Store → Themes",
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
          title: "Paste the snippet inside <head>",
          body: "Find the closing </head> tag and paste your Marech snippet just before it.",
        },
        {
          title: "Save",
          body: "Click Save. Monitoring is now active across your storefront and traffic starts appearing in your dashboard.",
        },
      ]}
      verifyMonitoring={
        <>
          Visit a product page in a normal browser and watch it appear in the dashboard traffic
          feed. Because <code>theme.liquid</code> wraps every storefront page, one paste covers your
          whole store — no need to edit individual templates.
        </>
      }
      blocking={{
        canBlock: true,
        method: "a Cloudflare Worker on your custom domain",
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
        verify: {
          cmd: 'curl -A "GPTBot/1.0" -I https://yourstore.com/',
          expect:
            "Once the Worker is live on your custom domain, a fake GPTBot request returns a 403 while a real browser loads your storefront normally.",
        },
      }}
      faq={[
        {
          q: "I'm on a myshopify.com address — can I block?",
          a: "Not at the edge. Blocking needs a checkpoint in front of Shopify, which requires a custom domain you can route through Cloudflare. On a *.myshopify.com URL you get monitoring only. Connecting a custom domain (which most stores do anyway) unlocks blocking.",
        },
        {
          q: "Does this work with the checkout pages?",
          a: "The snippet covers storefront pages rendered by your theme. Shopify's checkout is served on its own hardened infrastructure and isn't something Marech (or any theme code) hooks into — which is fine, since scrapers target your public product and content pages, not checkout.",
        },
      ]}
    />
  );
}
