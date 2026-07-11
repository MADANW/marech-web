import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Wix — Monitor AI Scrapers on Your Wix Site",
};

export default function WixPage() {
  return (
    <PlatformPage
      name="Wix"
      headline="Marech for Wix Users"
      subheadline="Add one line of code and see the AI scrapers hitting your Wix site in your dashboard — no developer needed."
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
          title: "Paste your Marech snippet and Save",
          body: "Paste the code you copied in step 1, give it a name like 'Marech', and click Apply. Traffic will start showing up in your dashboard.",
        },
      ]}
      blocking={{
        canBlock: false,
        summary:
          "Wix owns the entire request path — server, domain, and TLS — so you can't put an edge proxy or worker in front of it. On Wix, Marech monitors traffic and overlays JS-running bots, but non-JS scrapers can't be blocked. That's a platform limitation, stated honestly.",
      }}
    />
  );
}
