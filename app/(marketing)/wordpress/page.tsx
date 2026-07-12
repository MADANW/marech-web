import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for WordPress — Protect Your Blog from AI Scrapers",
  description:
    "Monitor AI-scraper traffic on WordPress with a one-line snippet, then turn on real server-side blocking with the free BlockMe plugin. Step-by-step guide.",
};

export default function WordPressPage() {
  return (
    <PlatformPage
      name="WordPress"
      category="Self-hosted CMS"
      setupTime="~2 minutes"
      headline="Marech for WordPress"
      subheadline="Monitor AI-scraper traffic in a minute with the snippet — then flip on real server-side blocking with the BlockMe plugin."
      overview={
        <>
          Self-hosted WordPress is the one place a hosted-CMS site gets real blocking with no proxy
          in front of it. Start with the monitoring snippet to see who&apos;s scraping you, then
          install the BlockMe plugin to stop non-JS scrapers server-side, before your theme even
          renders.
        </>
      }
      snippetPlacement="Appearance → Theme File Editor → header.php"
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'Sign up and grab your unique script tag from the Marech dashboard ("Get Snippet Code").',
        },
        {
          title: "Go to Appearance → Theme File Editor",
          body: "In your WordPress dashboard, navigate to Appearance, then click Theme File Editor (or Theme Editor).",
        },
        {
          title: "Select header.php",
          body: "In the right sidebar, find and click on header.php to edit your theme's header file.",
        },
        {
          title: "Paste the snippet before </head>",
          body: "Find the </head> closing tag and paste your Marech snippet immediately before it.",
        },
        {
          title: "Click Update File",
          body: "Save the file. Monitoring is now active — scraper traffic will start showing up in your dashboard.",
        },
        {
          title: "Prefer not to edit theme files?",
          body: "Install the free 'Insert Headers and Footers' (WPCode) plugin and paste your snippet in the Header section instead — no code editing required.",
        },
      ]}
      verifyMonitoring={
        <>
          Load any page of your site while logged out and check the dashboard traffic feed. Tip: a
          theme update can overwrite <code>header.php</code>, so if monitoring stops after an update,
          re-paste the snippet — or use the headers plugin, which survives updates.
        </>
      }
      blocking={{
        canBlock: true,
        method: "the BlockMe WordPress plugin",
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
            body: "Run the check below — a fake GPTBot request should get a 403 while a normal browser still loads the page. Logged-in users, admin, cron, and REST requests are never checked, so your editing never gets blocked.",
          },
        ],
        verify: {
          cmd: 'curl -A "GPTBot/1.0" -I https://yoursite.com/',
          expect:
            "You should see HTTP/1.1 403 for the bot user-agent, while your browser loads the page normally. The plugin fails open, so a Marech outage never takes your site down.",
        },
      }}
      faq={[
        {
          q: "Do I need the plugin if I already pasted the snippet?",
          a: "Only if you want to actually block scrapers. The snippet monitors; the plugin blocks. Many people run the snippet for a week to see the scale of the problem, then activate the plugin.",
        },
        {
          q: "Will BlockMe conflict with my caching or security plugins?",
          a: "No. BlockMe runs its check on front-end page views before the theme renders and fails open on any error. Full-page caches may serve cached HTML without a fresh check — exclude bot user-agents from your cache, or let the edge/Cloudflare option handle blocking upstream.",
        },
      ]}
    />
  );
}
