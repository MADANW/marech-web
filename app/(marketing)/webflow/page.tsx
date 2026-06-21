import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "BlockMe for Webflow — Protect Your Webflow Site from AI Scrapers",
};

export default function WebflowPage() {
  return (
    <PlatformPage
      name="Webflow"
      headline="BlockMe for Webflow Sites"
      subheadline="Block AI scrapers from stealing your Webflow content — one embed, all pages protected."
      steps={[
        {
          title: "Copy your BlockMe snippet",
          body: 'After signing up, go to your BlockMe dashboard and click "Get Snippet Code". Copy the script tag.',
        },
        {
          title: "Open your Webflow project",
          body: "Log in to Webflow and open the Designer for your site.",
        },
        {
          title: "Go to Site Settings → Custom Code",
          body: "Click the gear icon (⚙) in the top-left, then choose the Custom Code tab.",
        },
        {
          title: "Paste into the Head Code section",
          body: "In the 'Head Code' field, paste your BlockMe snippet. This applies it to every page automatically.",
        },
        {
          title: "Save and Publish",
          body: "Click Save Changes, then Publish your site. BlockMe is now active on all pages.",
        },
      ]}
    />
  );
}
