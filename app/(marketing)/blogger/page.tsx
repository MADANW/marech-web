import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Blogger — Monitor AI Scrapers on Your Blogspot Site",
  description:
    "Add one snippet to your Blogger theme and see which AI scrapers are harvesting your posts in your dashboard. Step-by-step monitoring guide.",
};

export default function BloggerPage() {
  return (
    <PlatformPage
      name="Blogger"
      category="Publishing platform"
      setupTime="~3 minutes"
      headline="Marech for Blogger"
      subheadline="Add one snippet to your Blogger theme and see exactly which AI scrapers are lifting your posts for training data."
      overview={
        <>
          Blogger lets you edit your theme&apos;s HTML directly, so the monitoring snippet goes into
          the <code>&lt;head&gt;</code> once and covers every post and page. Blogger is hosted by
          Google, which owns the request path — so monitoring works everywhere, but non-JS scrapers
          can be observed rather than blocked.
        </>
      }
      snippetPlacement="Theme → ⋮ → Edit HTML → before </head>"
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, open your Marech dashboard and click "Get Snippet Code". Copy the one-line script tag.',
        },
        {
          title: "Open Theme in your Blogger dashboard",
          body: "In the left menu of your Blogger dashboard, click Theme.",
        },
        {
          title: "Click the menu (⋮) → Edit HTML",
          body: "Next to the Customize button, click the three-dot menu and choose Edit HTML to open your theme's template.",
        },
        {
          title: "Paste the snippet before </head>",
          body: "Find the closing </head> tag in the template and paste your Marech snippet immediately before it. The snippet is a standard, well-formed <script> tag, so it's safe for Blogger's template format.",
        },
        {
          title: "Save the theme",
          body: "Click Save (the disk icon). Monitoring is now live across your whole blog — traffic will appear in your dashboard.",
        },
      ]}
      verifyMonitoring={
        <>
          Open any post on your live <code>blogspot.com</code> (or custom) domain in a browser and
          confirm your visit appears in the dashboard feed. Editing the theme HTML covers every post
          automatically — no need to change individual posts.
        </>
      }
      blocking={{
        canBlock: false,
        method: "not available on Blogger",
        summary:
          "Blogger is hosted by Google, which controls the server, domain, and TLS — so there's no way to insert an edge proxy or worker in front of it. On Blogger, Marech monitors traffic and overlays JS-running bots, but non-JS scrapers can't be blocked.",
      }}
      faq={[
        {
          q: "Does this work on both blogspot.com and a custom domain?",
          a: "Yes — monitoring works whether your blog is on a *.blogspot.com address or a custom domain, since the snippet lives in your theme. Blocking isn't possible on either, because Google serves the pages and you can't put an edge check in front.",
        },
        {
          q: "Will editing the theme HTML break my blog?",
          a: "Pasting a single well-formed <script> tag just before </head> is safe and reversible. If you ever want to remove it, edit the theme HTML again and delete that line. Consider backing up your theme (Theme → Backup) first, as good practice.",
        },
      ]}
    />
  );
}
