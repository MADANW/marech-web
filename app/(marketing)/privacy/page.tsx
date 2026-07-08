export const metadata = {
  title: "Privacy Policy — Marech",
  description: "Marech Privacy Policy",
};

const LAST_UPDATED = "June 21, 2026";
const EFFECTIVE_DATE = "June 21, 2026";
const COMPANY = "Marech";
const CONTACT_EMAIL = "privacy@marech.tech";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <div className="mb-12">
        <span className="text-eyebrow text-mars-ember block mb-3">
          Legal
        </span>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm">
          Last updated: {LAST_UPDATED} · Effective: {EFFECTIVE_DATE}
        </p>
      </div>

      <div className="mars-card--marketing rounded-xl p-5 mb-10 text-sm text-white/60 border-l-2 border-mars-ember/50">
        <span className="font-semibold text-white">Template — not legal advice.</span> This policy is a
        starting point drafted for {COMPANY} and has <span className="text-white/80">not</span> been
        reviewed by an attorney. Before publishing, have qualified counsel confirm the entity name and
        jurisdiction, the subprocessor list, retention periods, and your GDPR/CCPA and DPA obligations —
        especially because {COMPANY} processes third parties&rsquo; personal data (your visitors&rsquo;
        IP addresses and user-agents) on behalf of its customers.
      </div>

      <div className="space-y-10 text-white/70 leading-relaxed">

        <Section title="1. Overview">
          <p>
            {COMPANY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains what information we collect, how we use it,
            and your rights regarding that information when you use marech.tech and
            related services (the &ldquo;Service&rdquo;).
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <Subsection title="Account Information">
            <p>
              When you register, we collect your name, email address, and billing
              information (processed via our payment provider — we do not store
              raw card numbers).
            </p>
          </Subsection>
          <Subsection title="Website Traffic Data (your visitors)">
            <p>
              To detect and block AI scrapers, we process HTTP request metadata from
              visitors to your website: IP address, User-Agent string, requested URL
              path, timestamp, and headers used to classify bot traffic. This data
              reaches us either from our JavaScript snippet (monitoring) or from a
              server-side integration you install — our Cloudflare Worker, WordPress
              plugin, Vercel middleware, or nginx proxy (blocking). We act as a{" "}
              <strong className="text-white">data processor</strong> for this visitor
              data, on your behalf and under your instructions (see &ldquo;Your Role
              vs. Ours&rdquo; below).
            </p>
          </Subsection>
          <Subsection title="Usage and Analytics">
            <p>
              We collect information about how you interact with the dashboard:
              pages visited, features used, and session duration. This helps us
              improve the Service.
            </p>
          </Subsection>
          <Subsection title="Communications">
            <p>
              If you contact us by email or through support channels, we retain
              that correspondence.
            </p>
          </Subsection>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul>
            <li>Provide, operate, and improve the Service</li>
            <li>Detect and classify AI bot traffic on your behalf</li>
            <li>Send transactional emails (receipts, alerts, security notices)</li>
            <li>Send product updates if you opt in</li>
            <li>Comply with legal obligations</li>
            <li>Investigate abuse and enforce our Terms of Service</li>
          </ul>
          <p>
            We do not sell your personal data to third parties. We do not use your
            website visitor data to train AI models.
          </p>
        </Section>

        <Section title="4. Data Retention">
          <p>
            Bot traffic logs are retained for <strong className="text-white">90 days</strong> by
            default. Aggregated analytics (totals, trends) are retained indefinitely.
            Account data is retained until you delete your account, after which it is
            purged within 30 days.
          </p>
        </Section>

        <Section title="5. Your Role vs. Ours (Controller / Processor)">
          <p>
            For <strong className="text-white">account data</strong> (your name, email, billing), {COMPANY}
            is the data <strong className="text-white">controller</strong>. For{" "}
            <strong className="text-white">website traffic data</strong> about your visitors, {COMPANY} is
            a data <strong className="text-white">processor</strong> acting on your instructions — you are
            the controller for that data and are responsible for having a lawful basis and appropriate
            notices for the visitors of your own site.
          </p>
          <p>
            Business customers who need a <strong className="text-white">Data Processing Agreement (DPA)</strong>{" "}
            (including EU Standard Contractual Clauses and the subprocessor list below) can request one at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="6. Subprocessors & Disclosure">
          <p>
            We use a small set of vetted subprocessors to run the Service. Hosting on a provider does not
            put you under that provider&rsquo;s policies — they process data on our behalf under contract:
          </p>
          <ul>
            <li><strong className="text-white">Amazon Web Services (AWS)</strong> — cloud hosting & database (United States)</li>
            <li><strong className="text-white">Stripe</strong> — payment processing (we never store raw card numbers)</li>
            <li><strong className="text-white">Google</strong> — &ldquo;Sign in with Google&rdquo; authentication (only if you use it)</li>
            <li><strong className="text-white">Email delivery provider</strong> — transactional email (verification, receipts, alerts)</li>
          </ul>
          <p>We also disclose data when:</p>
          <ul>
            <li>
              <strong className="text-white">Legally required</strong> — by law, court order, or government request
            </li>
            <li>
              <strong className="text-white">Business transfer</strong> — in a merger or acquisition, subject to the same privacy commitments
            </li>
          </ul>
          <p className="text-white/40 text-sm">
            Keep this list current — adding a subprocessor generally requires notifying customers under your DPA.
          </p>
        </Section>

        <Section title="7. Cookies and Tracking">
          <p>
            We use essential cookies for authentication and session management.
            We use analytics cookies (e.g. Plausible or similar privacy-first tools)
            to understand dashboard usage. We do not use third-party advertising cookies.
          </p>
          <p>
            You can disable cookies in your browser, but this may break authentication.
          </p>
        </Section>

        <Section title="8. Security">
          <p>
            Data is encrypted in transit (TLS 1.2+) and at rest (AES-256). We
            enforce access controls and conduct regular security reviews. No method
            of transmission over the internet is 100% secure — we cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
            <li>Object to or restrict certain processing</li>
            <li>Data portability (receive your data in a machine-readable format)</li>
            <li>Withdraw consent at any time where processing is based on consent</li>
          </ul>
          <p>
            To exercise any of these rights, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
            . We will respond within 30 days.
          </p>
        </Section>

        <Section title="10. Children's Privacy">
          <p>
            The Service is not directed at children under 13. We do not knowingly
            collect data from children. If you believe we have collected data from
            a child, contact us and we will delete it promptly.
          </p>
        </Section>

        <Section title="11. International Transfers">
          <p>
            We operate primarily in the United States. If you are located outside
            the US, your data may be transferred to and processed in the US.
            Where required by law (e.g. GDPR), we rely on Standard Contractual
            Clauses or other lawful transfer mechanisms.
          </p>
        </Section>

        <Section title="12. GDPR (EEA Users)">
          <p>
            If you are in the European Economic Area, our lawful bases for processing
            are: (a) contract performance for operating the Service; (b) legitimate
            interests for security and abuse prevention; (c) legal obligation for
            compliance; and (d) consent where applicable. You have the right to
            lodge a complaint with your local supervisory authority.
          </p>
        </Section>

        <Section title="13. CCPA (California Residents)">
          <p>
            California residents may request disclosure of personal information
            collected, sold, or disclosed, and may opt out of the &ldquo;sale&rdquo; of
            personal information. {COMPANY} does not sell personal information.
            To submit a verifiable consumer request, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="14. Changes to This Policy">
          <p>
            We may update this policy. Material changes will be notified via email
            or an in-app banner at least 14 days before they take effect. Continued
            use after the effective date constitutes acceptance.
          </p>
        </Section>

        <Section title="15. Contact Us">
          <p>
            Privacy questions or requests:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-white/40 text-sm mt-2">
            Marech · Privacy Team · Delaware, USA
          </p>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-lg font-bold text-white tracking-[-0.02em] mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">{children}</div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/90 mb-1">{title}</h3>
      {children}
    </div>
  );
}
