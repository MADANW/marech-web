"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/Toast";
import { MOCK_ACCOUNT } from "@/lib/mock";
import { useAuth } from "@/lib/auth";
import { isMock, snippetUrl } from "@/lib/api";

const PLATFORMS = ["WordPress", "Wix", "Squarespace", "Shopify", "Webflow", "Custom / Other"];

const INSTRUCTIONS: Record<string, { steps: string[]; nav: string }> = {
  WordPress: {
    nav: "Appearance → Theme Editor → header.php",
    steps: [
      "Go to Appearance → Theme File Editor in your WordPress admin",
      "Click on header.php in the file list on the right",
      "Find the closing </head> tag",
      "Paste your snippet immediately before </head>",
      "Click Update File",
    ],
  },
  Wix: {
    nav: "Settings → Custom Code → Add Custom Code",
    steps: [
      "In Wix Editor, go to Settings → Custom Code",
      "Click Add Custom Code",
      "Choose Head placement and All Pages",
      "Paste your snippet in the code box",
      "Click Apply",
    ],
  },
  Squarespace: {
    nav: "Settings → Advanced → Code Injection",
    steps: [
      "In Squarespace admin, go to Settings → Advanced → Code Injection",
      "Paste your snippet in the Header field",
      "Click Save",
    ],
  },
  Shopify: {
    nav: "Online Store → Themes → Edit code → theme.liquid",
    steps: [
      "In Shopify admin, go to Online Store → Themes",
      "Click the three-dot menu → Edit code",
      "Open theme.liquid from the Layout folder",
      "Find </head> and paste your snippet just before it",
      "Click Save",
    ],
  },
  Webflow: {
    nav: "Project Settings → Custom Code → Head Code",
    steps: [
      "Open Project Settings in Webflow",
      "Go to the Custom Code tab",
      "Paste your snippet in the Head Code section",
      "Publish your site",
    ],
  },
  "Custom / Other": {
    nav: "Paste inside <head>...</head>",
    steps: [
      "Open your website's main HTML template",
      "Find the <head> section",
      "Paste your snippet anywhere inside <head>",
      "Deploy your changes",
    ],
  },
};

export default function SnippetPage() {
  const { user } = useAuth();
  const toast = useToast();
  const snippetId = user?.snippetId ?? MOCK_ACCOUNT.snippetId;
  const [platform, setPlatform] = useState(user?.platform ?? MOCK_ACCOUNT.platform);
  const [copied, setCopied] = useState(false);
  const [detected, setDetected] = useState(false);

  const snippetCode = isMock
    ? `<script src="https://cdn.marech.tech/${snippetId}.js"></script>`
    : `<script src="${snippetUrl(snippetId)}"></script>`;
  const instructions = INSTRUCTIONS[platform] ?? INSTRUCTIONS["Custom / Other"];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippetCode);
      setCopied(true);
      toast.success("Copied to clipboard", "Paste the snippet into your site's <head>.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy", "Select the code and copy it manually.");
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setDetected(true), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-7 max-w-2xl mx-auto space-y-5">
      <PageHeader
        title="Your protection code"
        subtitle="Copy this snippet and paste it into your website's <head> section"
      />

      {detected && (
        <div className="bg-success/10 border border-success/25 rounded-xl px-5 py-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-success shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="font-semibold text-success text-sm">Installation detected</div>
            <div className="text-success/80 text-xs">Protection is now active on your site.</div>
          </div>
        </div>
      )}

      {/* Code block */}
      <Card padding="none" className="overflow-hidden">
        <div className="bg-app-inset px-5 py-4 border-b border-app-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-app-faint font-mono">HTML · paste in &lt;head&gt;</span>
            <button
              onClick={handleCopy}
              className="text-xs text-app-faint hover:text-app-text flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-success" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="9" y="9" width="13" height="13" rx="2" /><path strokeLinecap="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="font-mono text-[13px] text-emerald-300 whitespace-pre-wrap break-all">
            {snippetCode}
          </pre>
        </div>
        <div className="p-5">
          <Button onClick={handleCopy} variant="accent" size="md" className="w-full !rounded-lg">
            {copied ? (<><CheckIcon className="h-4 w-4" /> Copied to clipboard</>) : "Copy code"}
          </Button>
        </div>
      </Card>

      {/* Platform selector + instructions */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-app-text text-[13.5px]">Installation instructions</h2>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="text-xs border border-app-border bg-app-inset rounded-lg px-2 py-1.5 text-app-text focus:border-accent/50 focus:ring-1 focus:ring-accent/30 outline-none [&>option]:bg-[#141416]"
          >
            {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>

        <div className="bg-app-inset rounded-lg px-4 py-3 text-xs text-app-muted font-mono mb-5">
          {platform} → {instructions.nav}
        </div>

        <ol className="relative space-y-4">
          <span className="absolute left-[13px] top-2 bottom-2 w-px bg-app-border" aria-hidden />
          {instructions.steps.map((step, i) => (
            <li key={i} className="relative flex gap-3 text-sm">
              <span className="relative z-10 w-[26px] h-[26px] rounded-full bg-accent/12 text-accent text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>
                {i + 1}
              </span>
              <span className="text-app-muted pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
