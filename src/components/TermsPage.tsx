'use client';

import Link from 'next/link';
import { useLang } from './LangProvider';

/**
 * Terms of use. English only for now.
 */
const SECTIONS = {
  what: 'What this is',
  'medical-advice': 'Not medical advice',
  warranty: 'No warranty',
  liability: 'Limitation of liability',
  account: 'Account use',
  'acceptable-use': 'Acceptable use',
  'third-party': 'Third-party content',
  changes: 'Changes',
  contact: 'Contact',
};

const EMAIL = 'privacy@sleepeazzzy.org';

export function TermsPage() {
  const lang = useLang();
  const isEnglish = lang === 'en';

  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Terms of use</h1>
        <p>Plain-language ground rules for using SleepEazzzy.</p>
        <p className="legal-meta">Last updated May 2026</p>
      </header>

      <div className="legal pg-body">
        <nav className="legal-toc" aria-labelledby="legal-toc-h">
          <h2 id="legal-toc-h">On this page</h2>
          <ul>
            {Object.entries(SECTIONS).map(([id, title]) => (
              <li key={id}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="prose">
          {!isEnglish && (
            <div className="note legal-lang">
              <p>
                These terms are published in English only for now. Translations will follow once they
                have been professionally reviewed.
              </p>
            </div>
          )}

          <p>
            By using sleepeazzzy.org you agree to these terms. If you don&apos;t agree, please don&apos;t
            use the site.
          </p>

          <section id="what">
            <h2>{SECTIONS.what}</h2>
            <p>
              SleepEazzzy is a free educational program about Cognitive Behavioral Therapy for Insomnia
              (CBT-I), provided by OWND LLC. The content is informational and based on published clinical
              guidelines.
            </p>
          </section>

          <section id="medical-advice">
            <h2>{SECTIONS['medical-advice']}</h2>
            <p>
              The content on SleepEazzzy (videos, modules, tools, audio, all of it) is for general
              education only. It is <strong>not</strong> personalized medical advice, diagnosis or
              treatment. Always consult a qualified healthcare provider with questions about your health,
              your medications or any condition.
            </p>
            <p>
              If you are experiencing a medical emergency, or if you have thoughts of harming yourself,
              please call your local emergency number or, in the United States, dial 988 (Suicide &amp;
              Crisis Lifeline) or 911.
            </p>
          </section>

          <section id="warranty">
            <h2>{SECTIONS.warranty}</h2>
            <p>
              The site is provided &quot;as is&quot; and &quot;as available.&quot; We make no warranties
              about completeness, accuracy, fitness for a particular purpose or uninterrupted
              availability. Use at your own risk.
            </p>
          </section>

          <section id="liability">
            <h2>{SECTIONS.liability}</h2>
            <p>
              To the maximum extent permitted by law, OWND LLC and its affiliates are not liable for any
              direct, indirect, incidental, consequential or punitive damages arising from your use of the
              site or reliance on its content. This includes, but is not limited to, any outcome related
              to sleep, health, work, driving or relationships.
            </p>
          </section>

          <section id="account">
            <h2>{SECTIONS.account}</h2>
            <p>
              If you create an account, you are responsible for keeping your sign-in credentials secure
              and for activity on your account. Tell us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> if you
              suspect unauthorized access.
            </p>
          </section>

          <section id="acceptable-use">
            <h2>{SECTIONS['acceptable-use']}</h2>
            <p>
              Don&apos;t try to break the service, scrape data at scale, attempt unauthorized access, or
              use the site to harm yourself or others. We may suspend or terminate accounts that abuse the
              service.
            </p>
          </section>

          <section id="third-party">
            <h2>{SECTIONS['third-party']}</h2>
            <p>
              The audio library plays YouTube videos through YouTube&apos;s privacy-enhanced embed.
              YouTube&apos;s own terms apply to that playback. We don&apos;t control or warrant
              third-party content.
            </p>
          </section>

          <section id="changes">
            <h2>{SECTIONS.changes}</h2>
            <p>
              We may update these terms. Material changes will be posted here with a new &quot;Last
              updated&quot; date. Continued use after a change constitutes acceptance.
            </p>
          </section>

          <section id="contact">
            <h2>{SECTIONS.contact}</h2>
            <p>
              Questions about these terms: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </section>

          <p className="legal-also">
            See also the <Link href={`/${lang}/privacy`}>privacy policy</Link> and the{' '}
            <Link href={`/${lang}/about`}>about page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
