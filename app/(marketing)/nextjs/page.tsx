import { PlatformPage } from "@/components/marketing/PlatformPage";

export const metadata = {
  title: "Marech for Next.js & React — Monitor & Block AI Scrapers",
  description:
    "Add the monitoring snippet to your Next.js or React app, then block non-JS scrapers at the edge with Vercel/Next.js middleware. Step-by-step developer guide.",
};

export default function NextjsPage() {
  return (
    <PlatformPage
      name="Next.js"
      category="Framework (React)"
      setupTime="~5 minutes"
      headline="Marech for Next.js & React Apps"
      subheadline="Add one script tag to monitor scraper traffic — then, because you own the deployment, block non-JS scrapers at the edge with Next.js middleware."
      overview={
        <>
          A Next.js or React app is code you deploy yourself, so you get both modes. The monitoring
          snippet goes into your root layout (or <code>index.html</code> for a plain React SPA), and
          because you control the server or edge, you can add a middleware check that returns a 403
          to scrapers before your page is ever rendered.
        </>
      }
      snippetPlacement="app/layout.tsx (App Router) · pages/_document.tsx (Pages Router) · index.html (React SPA)"
      steps={[
        {
          title: "Copy your Marech snippet",
          body: 'After signing up, open your Marech dashboard and click "Get Snippet Code". Copy the one-line <script> tag (you\'ll add it to your app\'s <head>).',
        },
        {
          title: "App Router: add it to your root layout",
          body: "In app/layout.tsx, render the <script> inside the document <head>. You can drop the plain tag into <head>, or use next/script with strategy=\"afterInteractive\" for finer control.",
        },
        {
          title: "Pages Router: add it to _document",
          body: "In pages/_document.tsx, place the <script> inside the <Head> element so it loads on every page.",
        },
        {
          title: "Plain React (Vite / CRA): add it to index.html",
          body: "Open public/index.html (CRA) or index.html (Vite) and paste the snippet inside the <head> tag.",
        },
        {
          title: "Deploy",
          body: "Ship your change (e.g. push to Vercel). Marech starts monitoring traffic in your dashboard as soon as the new build is live.",
        },
      ]}
      verifyMonitoring={
        <>
          Load your deployed app in a browser and check the{" "}
          <a href="/dashboard" className="text-accent hover:underline">dashboard</a> feed. View source
          on a rendered page and confirm the <code>&lt;script&gt;</code> tag is present in{" "}
          <code>&lt;head&gt;</code> — for SSR/SSG apps it should appear in the server-rendered HTML.
        </>
      }
      extraPrerequisites={[
        <>Your app deployed somewhere you control the edge — Vercel, Cloudflare, or your own server.</>,
      ]}
      blocking={{
        canBlock: true,
        method: "Next.js / Vercel edge middleware",
        summary:
          "Because you deploy the app yourself, you can run the enforcement check at the edge. A middleware.ts at your project root checks each request before your page renders and returns a 403 to scrapers — the same contract the Cloudflare Worker and nginx proxy use.",
        docsHref: "https://github.com/MADANW/marech-BD/tree/main/integrations/vercel",
        steps: [
          {
            title: "Create an API key and a block policy",
            body: "In the Marech dashboard, create an API key (shown once — copy it) and add a block policy (e.g. bot types scraper and ai_tool).",
          },
          {
            title: "Set BLOCKME env vars in your host",
            body: "Add BLOCKME_API_URL (https://api.marech.tech) and BLOCKME_API_KEY (your bm_ key) as environment variables in Vercel (or your host). Redeploy so they're available at the edge.",
          },
          {
            title: "Add the BlockMe middleware",
            body: "Copy the BlockMe middleware.ts from the marech-BD integrations/vercel folder to your project root and adjust the matcher to skip static assets. It POSTs each request to /v1/enforce and returns a 403 on a block verdict, failing open on any error.",
          },
          {
            title: "Not on Vercel? Use the Cloudflare Worker",
            body: "If your app is fronted by Cloudflare instead, deploy the BlockMe Cloudflare Worker on your zone route — it enforces the same policies without touching your app code.",
          },
        ],
        verify: {
          cmd: 'curl -A "GPTBot/1.0" -I https://yourapp.com/',
          expect:
            "With middleware deployed, a fake GPTBot request returns a 403 while a real browser loads your app normally.",
        },
      }}
      faq={[
        {
          q: "App Router or Pages Router — does it matter?",
          a: "Not for blocking. Edge middleware (middleware.ts at the project root) works the same in both. For the monitoring snippet, App Router apps add it in app/layout.tsx and Pages Router apps in pages/_document.tsx.",
        },
        {
          q: "Should I use middleware or a Cloudflare Worker?",
          a: "If you deploy on Vercel, middleware.ts is the simplest — it lives in your repo and needs no extra infrastructure. If your domain is already fronted by Cloudflare, the Worker keeps enforcement out of your app entirely. Both call the same enforcement endpoint and enforce the same policies.",
        },
        {
          q: "Does the snippet work with SSR and SSG?",
          a: "Yes. It's a standard script tag in your <head>, so it ships in the server-rendered or statically generated HTML and runs in the visitor's browser. Remember that the snippet monitors; the middleware is what actually blocks non-JS scrapers.",
        },
      ]}
    />
  );
}
