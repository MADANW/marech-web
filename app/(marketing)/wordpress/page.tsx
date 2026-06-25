import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "block.me for WordPress — Protect Your Blog from AI Scrapers",
};

export default function WordPressPage() {
  return (
    <PlatformPage
      name="WordPress"
      headline="block.me for WordPress"
      subheadline="Stop AI from scraping your blog posts, recipes, and articles. Takes 30 seconds."
      steps={[
        {
          title: "Copy your block.me snippet",
          body: 'Sign up and grab your unique script tag from the block.me dashboard ("Get Snippet Code").',
        },
        {
          title: "Go to WordPress Admin → Appearance → Theme Editor",
          body: "In your WordPress dashboard, navigate to Appearance, then click Theme File Editor (or Theme Editor).",
        },
        {
          title: "Select header.php",
          body: "In the right sidebar, find and click on header.php to edit your theme's header file.",
        },
        {
          title: "Paste snippet before </head>",
          body: "Find the </head> closing tag and paste your block.me snippet immediately before it.",
        },
        {
          title: "Click Update File",
          body: "Click the Update File button to save. Protection is now active across your entire site.",
        },
        {
          title: "Alternative: Use a plugin",
          body: "Prefer not to edit theme files? Install the 'Insert Headers and Footers' plugin (free) and paste your snippet in the Header section.",
        },
      ]}
    />
  );
}
