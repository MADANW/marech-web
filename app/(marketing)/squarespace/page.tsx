import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Squarespace — Protect Your Site from AI Scrapers",
};

export default function SquarespacePage() {
  return (
    <PlatformPage
      name="Squarespace"
      headline="Marech for Squarespace"
      subheadline="Protect your Squarespace site from AI content scrapers without touching any code."
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, click "Get Snippet Code" in your Marech dashboard and copy the script tag.',
        },
        {
          title: "Open Squarespace Admin",
          body: "Log in to your Squarespace account and go to your site editor.",
        },
        {
          title: "Go to Settings → Advanced → Code Injection",
          body: "In the left sidebar, click Settings, scroll to Advanced, then click Code Injection.",
        },
        {
          title: "Paste into the Header section",
          body: "In the Header field, paste your Marech snippet. This applies to every page automatically.",
        },
        {
          title: "Click Save",
          body: "Click the Save button. Your protection is now live across your entire Squarespace site.",
        },
      ]}
    />
  );
}
