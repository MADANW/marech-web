import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "block.me for Ghost — Protect Your Ghost Blog from AI Scrapers",
};

export default function GhostPage() {
  return (
    <PlatformPage
      name="Ghost"
      headline="block.me for Ghost Blogs"
      subheadline="Stop AI bots from scraping your Ghost publications — injected once into your theme, protects everything."
      steps={[
        {
          title: "Copy your block.me snippet",
          body: 'After signing up, open your block.me dashboard and click "Get Snippet Code". Copy the script tag.',
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
          body: "Paste your block.me snippet into the Site Header box. This injects it into the <head> of every page and post.",
        },
        {
          title: "Click Save",
          body: "Hit Save. block.me is now live across your entire Ghost publication.",
        },
      ]}
    />
  );
}
