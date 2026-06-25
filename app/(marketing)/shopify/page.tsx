import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "block.me for Shopify — Protect Your Store from AI Scrapers",
};

export default function ShopifyPage() {
  return (
    <PlatformPage
      name="Shopify"
      headline="block.me for Shopify Stores"
      subheadline="Stop competitors from using AI to scrape your product descriptions and prices."
      steps={[
        {
          title: "Copy your block.me snippet",
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
          body: "Find the closing </head> tag and paste your block.me snippet just before it.",
        },
        {
          title: "Save and publish",
          body: "Click Save. Your entire store is now protected — product pages, collections, and all.",
        },
      ]}
    />
  );
}
