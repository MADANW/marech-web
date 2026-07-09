export const metadata = {
  title: "Data Processing Agreement — Marech",
  description: "Marech Data Processing Agreement (DPA) for customers, covering GDPR Article 28 terms and international transfer safeguards.",
};

const LAST_UPDATED = "July 9, 2026";
const EFFECTIVE_DATE = "July 9, 2026";
const COMPANY = "Marech";
const CONTACT_EMAIL = "mohamed@muhsinai.com";

export default function DpaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <div className="mb-12">
        <span className="text-eyebrow text-mars-ember block mb-3">Legal</span>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Data Processing Agreement
        </h1>
        <p className="text-white/40 text-sm">
          Last updated: {LAST_UPDATED} · Effective: {EFFECTIVE_DATE}
        </p>
      </div>

      <div className="mars-card--marketing rounded-xl p-5 mb-10 text-sm text-white/60 border-l-2 border-mars-ember/50">
        <span className="font-semibold text-white">Template — not legal advice.</span> This DPA is a
        starting point drafted for {COMPANY} and has <span className="text-white/80">not</span> been
        reviewed by an attorney. It is written for the role {COMPANY} actually has here — as the{" "}
        <strong className="text-white/80">processor</strong> handling your website visitors&rsquo; data on
        your behalf, not the more common &ldquo;customer signing a vendor&rsquo;s DPA&rdquo; direction. Have
        qualified counsel review it — and the Standard Contractual Clauses it incorporates by
        reference — before relying on it for a regulated deployment.
      </div>

      <div className="space-y-10 text-white/70 leading-relaxed">

        <Section title="1. Purpose and Roles">
          <p>
            This Data Processing Agreement (&ldquo;DPA&rdquo;) supplements the {COMPANY}{" "}
            <a href="/terms" className="text-accent hover:underline">Terms of Service</a> between {COMPANY}{" "}
            (&ldquo;Processor&rdquo;, &ldquo;we&rdquo;) and the customer using the Service
            (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;). It applies whenever {COMPANY} processes personal
            data of Customer&rsquo;s website visitors on Customer&rsquo;s behalf while providing bot
            detection and blocking.
          </p>
          <p>
            For that visitor data, <strong className="text-white">Customer is the data controller</strong> and{" "}
            <strong className="text-white">{COMPANY} is the data processor</strong>, acting only on
            Customer&rsquo;s documented instructions (this DPA, the Terms, and Customer&rsquo;s dashboard
            configuration, e.g. policies). This DPA does not cover {COMPANY}&rsquo;s processing of
            Customer&rsquo;s own account and billing data, where {COMPANY} acts as controller — see the{" "}
            <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
          </p>
        </Section>

        <Section title="2. Incorporation and Precedence">
          <p>
            This DPA is incorporated into and forms part of the Terms of Service for Customers on a paid
            or trial plan. If you require a countersigned copy for procurement purposes, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
            In the event of a conflict between this DPA and the Terms regarding the processing of
            personal data, this DPA controls.
          </p>
        </Section>

        <Section title="3. Subject Matter and Details of Processing (GDPR Art. 28(3))">
          <Subsection title="Subject matter">
            <p>Detection and blocking of automated bot / AI-scraper traffic on Customer&rsquo;s website.</p>
          </Subsection>
          <Subsection title="Duration">
            <p>For the term of the Terms of Service, and until deletion per Section 9 below.</p>
          </Subsection>
          <Subsection title="Nature and purpose">
            <p>
              Real-time analysis of individual HTTP requests to classify likely bot traffic, enforcement
              of Customer&rsquo;s configured policies (allow / block / log), and generation of the traffic
              logs and analytics shown on Customer&rsquo;s dashboard.
            </p>
          </Subsection>
          <Subsection title="Categories of data subjects">
            <p>Visitors to Customer&rsquo;s website (including human visitors, and automated clients/bots).</p>
          </Subsection>
          <Subsection title="Categories of personal data">
            <p>
              IP address, User-Agent string, requested URL path, request timestamp, and the limited set of
              HTTP headers used for bot-signal scoring (e.g. Accept-Language, Accept-Encoding, Connection).
              No special-category data is intentionally processed.
            </p>
          </Subsection>
        </Section>

        <Section title="4. Processor Obligations">
          <p>{COMPANY} shall:</p>
          <ul>
            <li>Process personal data only on Customer&rsquo;s documented instructions (including as set via the dashboard), unless required otherwise by law, in which case {COMPANY} will inform Customer unless legally prohibited from doing so;</li>
            <li>Ensure personnel authorized to process the data are bound by confidentiality obligations;</li>
            <li>Implement the technical and organizational measures described in Section 7;</li>
            <li>Not engage a sub-processor without authorization as described in Section 5;</li>
            <li>Assist Customer, taking into account the nature of the processing, in responding to data subject requests (Section 6) and in meeting Customer&rsquo;s obligations regarding security, breach notification, and data protection impact assessments, to the extent {COMPANY} has relevant information;</li>
            <li>At Customer&rsquo;s choice, delete or return personal data at the end of the engagement (Section 9);</li>
            <li>Make available information reasonably necessary to demonstrate compliance with this Section, and allow for audits as described in Section 8.</li>
          </ul>
        </Section>

        <Section title="5. Sub-processors">
          <p>
            Customer authorizes {COMPANY} to engage the following sub-processors, each engaged under a
            written agreement imposing data protection obligations materially equivalent to this DPA:
          </p>
          <ul>
            <li><strong className="text-white">Amazon Web Services (AWS)</strong> — cloud hosting &amp; database (United States)</li>
            <li><strong className="text-white">Vercel</strong> — hosting for the marketing site and customer dashboard (United States)</li>
            <li><strong className="text-white">Stripe</strong> — payment processing</li>
            <li><strong className="text-white">Google</strong> — &ldquo;Sign in with Google&rdquo; authentication, where Customer&rsquo;s account uses it</li>
            <li><strong className="text-white">Resend</strong> — transactional email delivery</li>
          </ul>
          <p>
            {COMPANY} will notify Customer of any new sub-processor materially involved in processing
            visitor data (e.g. via email or an in-app notice) before granting it access, giving Customer
            an opportunity to object on reasonable data-protection grounds.
          </p>
        </Section>

        <Section title="6. Data Subject Rights">
          <p>
            {COMPANY} will, taking into account the nature of the processing, assist Customer by appropriate
            technical and organizational measures in fulfilling requests from data subjects to exercise
            their rights under applicable law. Because {COMPANY} does not have a direct relationship with
            Customer&rsquo;s website visitors, {COMPANY} will forward any such request it receives directly
            to Customer and will not respond to the data subject except to do so, unless legally required.
          </p>
        </Section>

        <Section title="7. Technical and Organizational Measures">
          <p>{COMPANY} implements the security measures described in the Privacy Policy, including:</p>
          <ul>
            <li>Encryption in transit (TLS) and industry-standard hashing of passwords, API keys, and verification tokens (never stored in plaintext)</li>
            <li>Access controls limiting who can reach production systems and data</li>
            <li>Rate limiting and abuse protections on the API</li>
            <li>Security response headers and regular review of dependencies and configuration</li>
          </ul>
          <p>
            See the <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>, Security
            section, for the current, authoritative description — this DPA does not duplicate it so the two
            documents cannot drift out of sync.
          </p>
        </Section>

        <Section title="8. Audits">
          <p>
            {COMPANY} will make available information reasonably necessary to demonstrate compliance with
            this DPA (e.g. summaries of security practices) upon written request, no more than once per
            12-month period absent a security incident or regulatory requirement, subject to reasonable
            confidentiality restrictions and advance notice.
          </p>
        </Section>

        <Section title="9. Deletion or Return of Data">
          <p>
            Upon termination of the underlying subscription, {COMPANY} deletes Customer&rsquo;s account
            data and associated visitor traffic logs as part of account deletion, unless applicable law
            requires retention of specific records. Customer may request deletion at any time via the
            dashboard or by emailing{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="10. International Transfers">
          <p>
            {COMPANY} and its sub-processors listed in Section 5 are located in, and process personal data
            in, the United States. Where this DPA covers a transfer of personal data originating in the
            EEA, UK, or Switzerland to a country not deemed to provide an adequate level of data
            protection, the parties incorporate by reference the European Commission&rsquo;s Standard
            Contractual Clauses (Module Two: Controller to Processor), Annex to Implementing Decision (EU)
            2021/914 (&ldquo;<strong className="text-white">SCCs</strong>&rdquo;), available at{" "}
            <a
              href="https://eur-lex.europa.eu/eli/dec_impl/2021/914"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              eur-lex.europa.eu/eli/dec_impl/2021/914
            </a>
            , with:
          </p>
          <ul>
            <li>Annex I.A/B (parties &amp; description of transfer) as set out in Section 3 above and Customer&rsquo;s account details;</li>
            <li>Annex II (technical and organizational measures) as set out in Section 7 above;</li>
            <li>the UK Addendum to the SCCs issued by the UK Information Commissioner, where the transfer originates in the UK.</li>
          </ul>
          <p>
            {COMPANY} separately relies on the SCCs (or equivalent transfer mechanisms) that AWS, Stripe,
            and Google have in place as part of their own standard terms, as the basis for onward transfer
            to those sub-processors.
          </p>
        </Section>

        <Section title="11. Liability">
          <p>
            Each party&rsquo;s liability arising out of or related to this DPA is subject to the
            limitations and exclusions of liability set out in the{" "}
            <a href="/terms" className="text-accent hover:underline">Terms of Service</a>.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            Questions about this DPA, or to request a countersigned copy:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>
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
