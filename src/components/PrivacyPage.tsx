'use client';

import Link from 'next/link';
import { useLang, useT } from './LangProvider';

/**
 * Privacy policy. English only for now (legal text should be professionally
 * translated and counsel-reviewed before it is published in other languages).
 * Shown on every locale route; the surrounding nav and footer stay localized.
 */
const SECTIONS = {
  collect: 'What we collect',
  'not-collected': 'What we don’t collect',
  use: 'How we use your information',
  storage: 'Where it’s stored',
  delete: 'How to delete your data',
  changes: 'Changes to this policy',
  disclaimer: 'Not medical advice',
  contact: 'Contact',
};

const EMAIL = 'privacy@sleepeazzzy.org';

export function PrivacyPage() {
  const lang = useLang();
  const t = useT();
  const isEnglish = lang === 'en';

  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Privacy policy</h1>
        <p>How SleepEazzzy handles your information. We collect as little as possible, and we never sell it.</p>
        <p className="legal-meta">Last updated May 14, 2026</p>
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
                This privacy policy is published in English only for now. Translations will follow
                once they have been professionally reviewed.
              </p>
            </div>
          )}

          <p>
            SleepEazzzy is operated by OWND LLC (&quot;we,&quot; &quot;us&quot;). This page describes
            what information we collect when you use the site at sleepeazzzy.org and what we do with it.
          </p>

          <section id="collect">
            <h2>{SECTIONS.collect}</h2>
            <ul>
              <li>
                <strong>Nothing about you, by default.</strong> If you don&apos;t sign in, the only data
                the site touches is what your own browser saves locally: your progress through modules,
                your saved reframes, your bedtime routine and your preferred language. None of it leaves
                your device.
              </li>
              <li>
                <strong>Email address (only if you sign in).</strong> When user accounts roll out,
                creating an account requires an email address so you can sign back in across devices.
              </li>
              <li>
                <strong>Module completion state (only if signed in).</strong> Which of the ten modules
                you&apos;ve marked complete, plus the date. This is what lets your progress sync between
                your phone and your laptop.
              </li>
              <li>
                <strong>Server request logs.</strong> Our host (Vercel) keeps standard web server logs
                (IP address, request path, user agent) for a short period for operational and security
                purposes.
              </li>
              <li>
                <strong>Anonymous visitor counts (Vercel Web Analytics).</strong> We use the cookieless
                analytics built into our host to count how many people visit, which pages they view, top
                referrers and country-level location. The tracker uses no cookies, no fingerprinting, no
                advertising IDs and no personally identifiable information. We use it to understand which
                modules are most useful, nothing else. See{' '}
                <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Vercel&apos;s privacy policy for Web Analytics
                </a>{' '}
                for details.
              </li>
            </ul>
          </section>

          <section id="not-collected">
            <h2>{SECTIONS['not-collected']}</h2>
            <ul>
              <li>No sleep diary or journal content. Reframes and routines stay on your device.</li>
              <li>
                No advertising trackers, no personalized profiling, and no third-party trackers beyond
                the cookieless Vercel Web Analytics described above.
              </li>
              <li>No payment information. The program is free.</li>
              <li>
                No health-record data. We are not a healthcare provider and not your clinician;
                SleepEazzzy is an educational resource.
              </li>
            </ul>
          </section>

          <section id="use">
            <h2>{SECTIONS.use}</h2>
            <p>
              We use your email and completion state for exactly one purpose: to let you sign in on
              another device and pick up where you left off. We do not sell, share, lease, rent or
              otherwise transfer your information to third parties.
            </p>
          </section>

          <section id="storage">
            <h2>{SECTIONS.storage}</h2>
            <p>
              The site is hosted by Vercel in the United States. Account data and progress (when the
              account feature launches) will be stored in a Supabase Postgres database, also in the
              United States. Both vendors are subject to their own data processing policies.
            </p>
          </section>

          <section id="delete">
            <h2>{SECTIONS.delete}</h2>
            <p>
              <strong>Without an account:</strong> open your browser&apos;s site data settings for
              sleepeazzzy.org and clear them. That&apos;s all there is.
            </p>
            <p>
              <strong>With an account:</strong> use the &quot;Delete my account&quot; button on your
              account page (coming with the account feature). Deletion is immediate and cascades to all
              of your progress. You can also email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we will
              delete your data within 30 days.
            </p>
          </section>

          <section id="changes">
            <h2>{SECTIONS.changes}</h2>
            <p>
              We may revise this policy from time to time. Material changes will be posted here with a
              new &quot;Last updated&quot; date. Continued use of the site after a change constitutes
              acceptance.
            </p>
          </section>

          <section id="disclaimer">
            <h2>{SECTIONS.disclaimer}</h2>
            <p>{t('disclaimer')}</p>
          </section>

          <section id="contact">
            <h2>{SECTIONS.contact}</h2>
            <p>
              Questions or concerns about your privacy: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </section>

          <p className="legal-also">
            See also the <Link href={`/${lang}/terms`}>terms of use</Link> and the{' '}
            <Link href={`/${lang}/about`}>about page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
