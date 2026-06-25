import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "block.me for Wix — Protect Your Wix Site from AI Scrapers",
};

export default function WixPage() {
  return (
    <PlatformPage
      name="Wix"
      headline="block.me for Wix Users"
      subheadline="Protect your Wix site from AI scrapers in 30 seconds — no developer needed."
      steps={[
        {
          title: "Copy your block.me snippet",
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
          body: "Set the code location to Head and apply it to All Pages so every page is protected.",
        },
        {
          title: "Paste your block.me snippet and Save",
          body: "Paste the code you copied in step 1, give it a name like 'block.me', and click Apply.",
        },
      ]}
    />
  );
}
