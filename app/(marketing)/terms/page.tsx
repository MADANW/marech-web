export const metadata = {
  title: "Terms of Service — Marech",
  description: "Marech Terms of Service",
};

const LAST_UPDATED = "June 21, 2026";
const EFFECTIVE_DATE = "June 21, 2026";
const COMPANY = "Marech";
const CONTACT_EMAIL = "legal@marech.tech";

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
            automated agents. The Service includes a JavaScript snippet, a management
            dashboard, analytics, and related tooling.
          </p>
        </Section>

        <Section title="3. Eligibility">
          <p>
            You must be at least 18 years old and have the legal authority to enter
            into these Terms on behalf of yourself or the organization you represent.
            By using the Service you represent that you meet these requirements.
          </p>
        </Section>

        <Section title="4. Account Registration">
          <p>
            You must provide accurate and complete information when creating an account.
            You are responsible for maintaining the confidentiality of your credentials
            and for all activity that occurs under your account. Notify us immediately
            at {CONTACT_EMAIL} of any unauthorized use.
          </p>
        </Section>

        <Section title="5. Acceptable Use">
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

        <Section title="6. Subscription and Billing">
          <p>
            The Service is offered on a subscription basis. Fees are billed in advance
            on a monthly or annual cycle as selected at checkout. All fees are
            non-refundable except as required by law or as described in our refund
            policy. We reserve the right to change pricing with 30 days&rsquo; notice.
          </p>
          <p>
            Failure to pay may result in suspension or termination of your account.
            You are responsible for all taxes applicable to your subscription.
          </p>
        </Section>

        <Section title="7. Free Trial">
          <p>
            We may offer a free trial period. No charge is applied during the trial.
            At the end of the trial, your account will be charged the applicable
            subscription fee unless you cancel before the trial ends.
          </p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>
            {COMPANY} retains all rights, title, and interest in the Service,
            including all software, algorithms, and brand assets. These Terms do not
            grant you any ownership rights. You retain ownership of your website
            content and data.
          </p>
        </Section>

        <Section title="9. Data and Privacy">
          <p>
            Your use of the Service is also governed by our Privacy Policy, which is
            incorporated into these Terms by reference. By using the Service you
            consent to the data practices described therein.
          </p>
        </Section>

        <Section title="10. Disclaimer of Warranties">
          <p>
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND.
            {COMPANY} EXPRESSLY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED,
            INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
            UNINTERRUPTED, ERROR-FREE, OR THAT ALL AI BOTS WILL BE BLOCKED.
          </p>
        </Section>

        <Section title="11. Limitation of Liability">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY} SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
            INDIRECTLY. OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY YOU
            IN THE 12 MONTHS PRECEDING THE CLAIM.
          </p>
        </Section>

        <Section title="12. Indemnification">
          <p>
            You agree to indemnify and hold harmless {COMPANY} and its officers,
            directors, employees, and agents from any claims, damages, or expenses
            arising from your use of the Service or violation of these Terms.
          </p>
        </Section>

        <Section title="13. Termination">
          <p>
            Either party may terminate this agreement at any time. You may cancel
            your subscription through your dashboard. We may suspend or terminate
            your account if you violate these Terms. Upon termination, your access
            to the Service will cease and data may be deleted after a retention period.
          </p>
        </Section>

        <Section title="14. Governing Law">
          <p>
            These Terms are governed by the laws of the State of Delaware, United
            States, without regard to conflict of law principles. Any disputes shall
            be resolved exclusively in the state or federal courts located in Delaware.
          </p>
        </Section>

        <Section title="15. Changes to Terms">
          <p>
            We may update these Terms at any time. Material changes will be communicated
            via email or an in-app notice at least 14 days before taking effect.
            Continued use after the effective date constitutes acceptance.
          </p>
        </Section>

        <Section title="16. Contact">
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
