'use client';

import Link from 'next/link';
import { useLang } from './LangProvider';

/**
 * Terms of use. English-only at v1.
 */
export function TermsPage() {
  const lang = useLang();
  const isEnglish = lang === 'en';

  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">Terms</div>
          <h1>Terms of Use</h1>
          <p className="mod-hero-sub">
            Plain-language ground rules for using Sleep Eazzzy.
          </p>
        </div>
      </header>
      <div className="container container-narrow mod-body">
        {!isEnglish && (
          <div className="callout" style={{ marginBottom: 24 }}>
            <div className="callout-label">Note</div>
            <p>
              These terms are published in English only at this time. Localized versions will
              follow once they have been professionally reviewed.
            </p>
          </div>
        )}

        <div className="lesson-block">
          <p>
            <strong>Last updated:</strong> May 2026
          </p>
          <p style={{ marginTop: 10 }}>
            By using sleepeazzzy.org you agree to these terms. If you don&apos;t agree, please
            don&apos;t use the site.
          </p>
        </div>

        <div className="lesson-block">
          <h4>1. What this is</h4>
          <p>
            Sleep Eazzzy is a free educational program about Cognitive Behavioral Therapy for
            Insomnia (CBT-I), provided by OWND LLC. The content is informational and based on
            published clinical guidelines.
          </p>
        </div>

        <div className="lesson-block">
          <h4>2. Not medical advice</h4>
          <p>
            The content on Sleep Eazzzy — videos, modules, tools, audio, all of it — is for
            general education only. It is <strong>not</strong> personalized medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare provider with
            questions about your health, your medications, or any condition.
          </p>
          <p style={{ marginTop: 10 }}>
            If you are experiencing a medical emergency, or if you have thoughts of harming
            yourself, please call your local emergency number or, in the United States, dial 988
            (Suicide &amp; Crisis Lifeline) or 911.
          </p>
        </div>

        <div className="lesson-block">
          <h4>3. No warranty</h4>
          <p>
            The site is provided &quot;as is&quot; and &quot;as available.&quot; We make no
            warranties about completeness, accuracy, fitness for a particular purpose, or
            uninterrupted availability. Use at your own risk.
          </p>
        </div>

        <div className="lesson-block">
          <h4>4. Limitation of liability</h4>
          <p>
            To the maximum extent permitted by law, OWND LLC and its affiliates are not liable
            for any direct, indirect, incidental, consequential, or punitive damages arising
            from your use of the site or reliance on its content. This includes — but is not
            limited to — any outcome related to sleep, health, work, driving, or relationships.
          </p>
        </div>

        <div className="lesson-block">
          <h4>5. Account use</h4>
          <p>
            If you create an account, you are responsible for keeping your sign-in credentials
            secure and for activity on your account. Notify us at{' '}
            <a href="mailto:privacy@sleepeazzzy.org" style={{ color: 'var(--denim)', textDecoration: 'underline' }}>
              privacy@sleepeazzzy.org
            </a>{' '}
            if you suspect unauthorized access.
          </p>
        </div>

        <div className="lesson-block">
          <h4>6. Acceptable use</h4>
          <p>
            Don&apos;t try to break the service, scrape data at scale, attempt unauthorized
            access, or use the site to harm yourself or others. We may suspend or terminate
            accounts that abuse the service.
          </p>
        </div>

        <div className="lesson-block">
          <h4>7. Third-party content</h4>
          <p>
            The audio library plays YouTube videos through YouTube&apos;s privacy-enhanced
            embed. YouTube&apos;s own terms apply to that playback. We don&apos;t control or
            warrant third-party content.
          </p>
        </div>

        <div className="lesson-block">
          <h4>8. Changes</h4>
          <p>
            We may update these terms. Material changes will be posted here with a new
            &quot;Last updated&quot; date. Continued use after a change constitutes acceptance.
          </p>
        </div>

        <div className="lesson-block">
          <h4>9. Contact</h4>
          <p>
            Questions about these terms:{' '}
            <a href="mailto:privacy@sleepeazzzy.org" style={{ color: 'var(--denim)', textDecoration: 'underline' }}>
              privacy@sleepeazzzy.org
            </a>
            .
          </p>
        </div>

        <p style={{ marginTop: 32, color: 'var(--muted)', fontSize: 14 }}>
          See also: <Link href={`/${lang}/privacy`} style={{ color: 'var(--denim)', textDecoration: 'underline' }}>Privacy</Link>
          {' · '}
          <Link href={`/${lang}/about`} style={{ color: 'var(--denim)', textDecoration: 'underline' }}>About</Link>
        </p>
      </div>
    </>
  );
}
