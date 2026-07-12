import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for WordPress — Protect Your Blog from AI Scrapers",
};

export default function WordPressPage() {
  return (
    <PlatformPage
      name="WordPress"
      headline="Marech for WordPress"
      subheadline="Monitor AI-scraper traffic in a minute with the snippet — then flip on real server-side blocking with the BlockMe plugin."
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'Sign up and grab your unique script tag from the Marech dashboard ("Get Snippet Code").',
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
          body: "Find the </head> closing tag and paste your Marech snippet immediately before it.",
        },
        {
          title: "Click Update File",
          body: "Click Update File to save. Monitoring is now active — scraper traffic will start showing up in your dashboard.",
        },
        {
          title: "Prefer not to edit theme files?",
          body: "Install the free 'Insert Headers and Footers' plugin and paste your snippet in the Header section instead.",
        },
      ]}
      blocking={{
        canBlock: true,
        summary:
          "Self-hosted WordPress is the one place where a hosted-CMS site gets real blocking without any proxy in front — the BlockMe plugin checks each request server-side, before your page renders, and returns a 403 to scrapers.",
        docsHref: "https://github.com/MADANW/marech-BD/tree/main/integrations/wordpress",
        steps: [
          {
            title: "Create an API key and a block policy",
            body: "In the Marech dashboard, open API Keys and create a key (it's shown once — copy it), then open Policies and add a block policy (e.g. bot types scraper and ai_tool).",
          },
          {
            title: "Install the BlockMe plugin",
            body: "Download the BlockMe plugin from the marech-BD integrations/wordpress folder on GitHub. In WP admin, go to Plugins → Add New → Upload Plugin, upload it, and Activate.",
          },
          {
            title: "Configure Settings → BlockMe",
            body: "Open Settings → BlockMe, paste your API URL (https://api.marech.tech) and the API key you created, tick Enable protection, and Save.",
          },
          {
            title: "Verify it's blocking",
            body: 'Run curl -A "GPTBot/1.0" https://yoursite.com/ — you should get a 403, while a normal browser still loads the page. The plugin fails open, so a Marech outage never takes your site down.',
          },
        ],
      }}
    />
  );
}
