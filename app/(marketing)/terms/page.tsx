export const metadata = {
  title: "Terms of Service — Marech",
  description: "Marech Terms of Service",
};

const LAST_UPDATED = "July 9, 2026";
const EFFECTIVE_DATE = "July 9, 2026";
const COMPANY = "Marech";
const CONTACT_EMAIL = "mohamed@muhsinai.com";

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-white/40 text-sm">
          Last updated: {LAST_UPDATED} · Effective: {EFFECTIVE_DATE}
        </p>
      </div>

      <div className="mars-card--marketing rounded-xl p-5 mb-10 text-sm text-white/60 border-l-2 border-mars-ember/50">
        <span className="font-semibold text-white">Template — not legal advice.</span> These terms are a
        starting point drafted for {COMPANY} and have <span className="text-white/80">not</span> been
        reviewed by an attorney. Have qualified counsel confirm the entity, governing law, liability caps,
        refund terms, and consumer-law requirements for your markets before relying on them.
      </div>

      <div className="mars-card--marketing rounded-2xl p-8 sm:p-10 prose prose-invert prose-sm max-w-none space-y-10 text-white/70 leading-relaxed">

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using {COMPANY} (&ldquo;the Service&rdquo;), you agree to be bound by
            these Terms of Service. If you do not agree, do not use the Service.
            These terms constitute a legally binding agreement between you and {COMPANY}.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            {COMPANY} provides a bot detection and blocking service that allows website
            owners to identify and restrict access from AI web scrapers, crawlers, and
            automated agents. The Service includes a JavaScript monitoring snippet, optional
            server-side enforcement integrations (Cloudflare Worker, WordPress plugin, Vercel
            middleware, or nginx proxy), a management dashboard, analytics, and related tooling.
          </p>
          <p>
            Detection is heuristic and enforcement is best-effort: the enforcement integrations
            are designed to <strong className="text-white">fail open</strong> (allow traffic) if the
            Service is unavailable, so we do not guarantee that every bot is blocked or that
            legitimate traffic is never affected. See Sections 8&ndash;9.
          </p>
        </Section>

        <Section title="3. Definitions">
          <ul>
            <li><strong className="text-white">&ldquo;Snippet&rdquo;</strong> — the JavaScript code you embed on your website for monitoring.</li>
            <li><strong className="text-white">&ldquo;Enforcement Integration&rdquo;</strong> — any server-side or edge component (reverse proxy, Cloudflare Worker, WordPress plugin, or middleware) that calls the Service to block traffic before your content is served.</li>
            <li><strong className="text-white">&ldquo;API Key&rdquo;</strong> — a credential (prefixed <code className="text-white/80">bm_</code>) that authenticates an Enforcement Integration to the Service on your behalf.</li>
            <li><strong className="text-white">&ldquo;Policy&rdquo;</strong> — the rules you configure in the dashboard (by bot type, path, or IP range) that determine whether traffic is allowed, blocked, or logged.</li>
            <li><strong className="text-white">&ldquo;Visitor&rdquo;</strong> — any person or automated client that requests content from your website.</li>
          </ul>
        </Section>

        <Section title="4. Eligibility">
          <p>
            You must be at least 18 years old and have the legal authority to enter
            into these Terms on behalf of yourself or the organization you represent.
            By using the Service you represent that you meet these requirements.
          </p>
        </Section>

        <Section title="5. Account Registration">
          <p>
            You must provide accurate and complete information when creating an account.
            You are responsible for maintaining the confidentiality of your credentials
            and for all activity that occurs under your account. Notify us immediately
            at {CONTACT_EMAIL} of any unauthorized use.
          </p>
        </Section>

        <Section title="6. Acceptable Use">
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Block legitimate human users or accessibility tools</li>
            <li>Circumvent legal obligations to provide access to your content</li>
            <li>Engage in any activity that violates applicable law</li>
            <li>Reverse-engineer, decompile, or attempt to extract source code</li>
            <li>Resell or sublicense the Service without written authorization</li>
            <li>Use the Service in a way that degrades infrastructure for other users</li>
          </ul>
        </Section>

        <Section title="7. Bot Detection Accuracy; No Guarantee">
          <p>
            Bot detection is based on heuristics (known scraper signatures, header analysis, IP
            reputation) and the Policies you configure. Heuristic detection can produce{" "}
            <strong className="text-white">false positives</strong> (blocking a legitimate Visitor)
            and <strong className="text-white">false negatives</strong> (allowing an automated
            client through). We do not warrant that the Service will detect or block all bots, or
            that it will never affect legitimate traffic.
          </p>
          <p>
            You are responsible for reviewing your traffic logs and configuring Policies
            appropriately for your website, including any legal obligations you have to admit
            specific automated agents (e.g. accessibility tools or search engine crawlers you rely
            on for discoverability). Enforcement Integrations fail open — if the Service is
            unreachable or slow, traffic is allowed through rather than blocked, so protection may
            lapse during an outage on our end.
          </p>
        </Section>

        <Section title="8. API Keys and Integrations">
          <p>
            You are responsible for safeguarding your API Keys and for revoking any key you believe
            has been compromised. You are responsible for how you configure and deploy Enforcement
            Integrations on your own infrastructure or on third-party platforms (e.g. Cloudflare,
            WordPress, Vercel, Shopify), including keeping them updated. {COMPANY} is not responsible
            for the availability, security, or configuration of third-party platforms outside our
            control.
          </p>
        </Section>

        <Section title="9. Subscription and Billing">
          <p>
            The Service is offered on a subscription basis. Fees are billed in advance
            on a monthly or annual cycle as selected at checkout. We reserve the right to change
            pricing with 30 days&rsquo; notice.
          </p>
          <p>
            Fees are generally non-refundable. However, if you are not satisfied within the first{" "}
            <strong className="text-white">30 days after your first payment</strong>, contact us at{" "}
            {CONTACT_EMAIL} for a full refund of that payment. Refunds outside this window are
            granted at our discretion or as required by law.
          </p>
          <p>
            Failure to pay may result in suspension or termination of your account.
            You are responsible for all taxes applicable to your subscription.
          </p>
        </Section>

        <Section title="10. Free Trial">
          <p>
            We may offer a free trial period. No charge is applied during the trial.
            At the end of the trial, your account will be charged the applicable
            subscription fee unless you cancel before the trial ends.
          </p>
        </Section>

        <Section title="11. Beta and Experimental Features">
          <p>
            From time to time we may offer features labeled beta, preview, or experimental. These
            are provided &ldquo;as is,&rdquo; may change or be discontinued at any time, and are
            excluded from any uptime or accuracy expectations that otherwise apply to the Service.
          </p>
        </Section>

        <Section title="12. Intellectual Property">
          <p>
            {COMPANY} retains all rights, title, and interest in the Service,
            including all software, algorithms, and brand assets. These Terms do not
            grant you any ownership rights. You retain ownership of your website
            content and data.
          </p>
        </Section>

        <Section title="13. Data and Privacy">
          <p>
            Your use of the Service is also governed by our Privacy Policy, which is
            incorporated into these Terms by reference. By using the Service you
            consent to the data practices described therein.
          </p>
          <p>
            Where {COMPANY} processes personal data of your website&rsquo;s visitors on your
            behalf, it does so as your <strong className="text-white">processor</strong> under the{" "}
            <a href="/dpa" className="text-accent hover:underline">Data Processing Agreement</a>,
            which is incorporated into these Terms by reference for paid/trial Customers. You are
            responsible for providing lawful notice to, and obtaining any required consent from,
            your own visitors.
          </p>
        </Section>

        <Section title="14. Disclaimer of Warranties">
          <p>
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND.
            {COMPANY} EXPRESSLY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED,
            INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
            UNINTERRUPTED, ERROR-FREE, OR THAT ALL BOTS WILL BE BLOCKED (SEE SECTION 7).
          </p>
        </Section>

        <Section title="15. Limitation of Liability">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY} SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
            INDIRECTLY, INCLUDING DAMAGES ARISING FROM BLOCKED LEGITIMATE TRAFFIC OR
            UNBLOCKED BOT TRAFFIC. OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY YOU
            IN THE 12 MONTHS PRECEDING THE CLAIM.
          </p>
        </Section>

        <Section title="16. Indemnification">
          <p>
            You agree to indemnify and hold harmless {COMPANY} and its officers,
            directors, employees, and agents from any claims, damages, or expenses
            arising from your use of the Service, your Policy configuration, or your
            violation of these Terms.
          </p>
        </Section>

        <Section title="17. Termination">
          <p>
            Either party may terminate this agreement at any time. You may cancel
            your subscription through your dashboard. We may suspend or terminate
            your account if you violate these Terms. Upon termination, your access
            to the Service will cease and data may be deleted after a retention period.
          </p>
        </Section>

        <Section title="18. Governing Law">
          <p>
            These Terms are governed by the laws of the State of Delaware, United
            States, without regard to conflict of law principles. Any disputes shall
            be resolved exclusively in the state or federal courts located in Delaware.
          </p>
        </Section>

        <Section title="19. Force Majeure">
          <p>
            Neither party is liable for delay or failure to perform resulting from causes
            outside its reasonable control, including acts of God, natural disaster, war,
            terrorism, labor disputes, internet or utility failures, or governmental action.
          </p>
        </Section>

        <Section title="20. Export Compliance">
          <p>
            You may not use the Service in violation of U.S. export control or sanctions laws,
            or if you are located in, or ordinarily resident in, a country subject to a U.S.
            government embargo, or are on any U.S. government restricted-party list.
          </p>
        </Section>

        <Section title="21. Assignment">
          <p>
            You may not assign or transfer these Terms without our prior written consent. We may
            assign these Terms in connection with a merger, acquisition, or sale of assets.
          </p>
        </Section>

        <Section title="22. Severability">
          <p>
            If any provision of these Terms is found unenforceable, the remaining provisions
            remain in full force and effect, and the unenforceable provision will be modified to
            the minimum extent necessary to make it enforceable.
          </p>
        </Section>

        <Section title="23. Entire Agreement; Notices">
          <p>
            These Terms, together with the Privacy Policy and (where applicable) the Data
            Processing Agreement, constitute the entire agreement between you and {COMPANY}
            regarding the Service. Notices to you may be sent to the email on your account; notices
            to us should be sent to {CONTACT_EMAIL}.
          </p>
        </Section>

        <Section title="24. Changes to Terms">
          <p>
            We may update these Terms at any time. Material changes will be communicated
            via email or an in-app notice at least 14 days before taking effect.
            Continued use after the effective date constitutes acceptance.
          </p>
        </Section>

        <Section title="25. Contact">
          <p>
            Questions about these Terms? Contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
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
