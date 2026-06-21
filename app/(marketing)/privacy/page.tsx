export const metadata = {
  title: "Privacy Policy — BlockMe",
  description: "BlockMe Privacy Policy",
};

const LAST_UPDATED = "June 21, 2026";
const EFFECTIVE_DATE = "June 21, 2026";
const COMPANY = "BlockMe";
const CONTACT_EMAIL = "privacy@blockme.io";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <div className="mb-12">
        <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3">
          Legal
        </span>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm">
          Last updated: {LAST_UPDATED} · Effective: {EFFECTIVE_DATE}
        </p>
      </div>

      <div className="space-y-10 text-white/70 leading-relaxed">

        <Section title="1. Overview">
          <p>
            {COMPANY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains what information we collect, how we use it,
            and your rights regarding that information when you use blockme.io and
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
          <Subsection title="Website Traffic Data">
            <p>
              Our JavaScript snippet collects HTTP request metadata from visitors
              to your website: IP address, User-Agent string, requested URL path,
              timestamp, and headers used to classify bot traffic. This data is
              processed on our servers to detect AI scrapers.
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

        <Section title="5. Sharing and Disclosure">
          <p>We share data only in these circumstances:</p>
          <ul>
            <li>
              <strong className="text-white">Service providers</strong> — payment processors (Stripe),
              cloud infrastructure (AWS), and email delivery who are bound by
              confidentiality agreements
            </li>
            <li>
              <strong className="text-white">Legal requirements</strong> — when required by law,
              court order, or government request
            </li>
            <li>
              <strong className="text-white">Business transfer</strong> — in the event of a merger
              or acquisition, subject to the same privacy commitments
            </li>
          </ul>
        </Section>

        <Section title="6. Cookies and Tracking">
          <p>
            We use essential cookies for authentication and session management.
            We use analytics cookies (e.g. Plausible or similar privacy-first tools)
            to understand dashboard usage. We do not use third-party advertising cookies.
          </p>
          <p>
            You can disable cookies in your browser, but this may break authentication.
          </p>
        </Section>

        <Section title="7. Security">
          <p>
            Data is encrypted in transit (TLS 1.2+) and at rest (AES-256). We
            enforce access controls and conduct regular security reviews. No method
            of transmission over the internet is 100% secure — we cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section title="8. Your Rights">
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

        <Section title="9. Children's Privacy">
          <p>
            The Service is not directed at children under 13. We do not knowingly
            collect data from children. If you believe we have collected data from
            a child, contact us and we will delete it promptly.
          </p>
        </Section>

        <Section title="10. International Transfers">
          <p>
            We operate primarily in the United States. If you are located outside
            the US, your data may be transferred to and processed in the US.
            Where required by law (e.g. GDPR), we rely on Standard Contractual
            Clauses or other lawful transfer mechanisms.
          </p>
        </Section>

        <Section title="11. GDPR (EEA Users)">
          <p>
            If you are in the European Economic Area, our lawful bases for processing
            are: (a) contract performance for operating the Service; (b) legitimate
            interests for security and abuse prevention; (c) legal obligation for
            compliance; and (d) consent where applicable. You have the right to
            lodge a complaint with your local supervisory authority.
          </p>
        </Section>

        <Section title="12. CCPA (California Residents)">
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

        <Section title="13. Changes to This Policy">
          <p>
            We may update this policy. Material changes will be notified via email
            or an in-app banner at least 14 days before they take effect. Continued
            use after the effective date constitutes acceptance.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p>
            Privacy questions or requests:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-white/40 text-sm mt-2">
            BlockMe · Privacy Team · Delaware, USA
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
        className="text-lg font-bold text-white mb-3"
        style={{ fontFamily: "var(--font-syne)" }}
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
