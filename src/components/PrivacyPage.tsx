'use client';

import Link from 'next/link';
import { useLang, useT } from './LangProvider';

/**
 * Privacy policy. English-only at v1 (legal text should be professionally
 * translated + counsel-reviewed before being published in other languages).
 * Shown on all four locale routes; the surrounding nav/footer stay localized.
 */
export function PrivacyPage() {
  const lang = useLang();
  const t = useT();
  const isEnglish = lang === 'en';

  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">Privacy</div>
          <h1>Privacy Policy</h1>
          <p className="mod-hero-sub">
            How Sleep Eazzzy handles your information. We collect as little as possible — and we
            never sell it.
          </p>
        </div>
      </header>
      <div className="container container-narrow mod-body">
        {!isEnglish && (
          <div className="callout" style={{ marginBottom: 24 }}>
            <div className="callout-label">Note</div>
            <p>
              This privacy policy is published in English only at this time. Localized
              versions will follow once they have been professionally reviewed.
            </p>
          </div>
        )}

        <div className="lesson-block">
          <p>
            <strong>Last updated:</strong> May 2026
          </p>
          <p style={{ marginTop: 10 }}>
            Sleep Eazzzy is operated by OWND LLC (&quot;we,&quot; &quot;us&quot;). This page
            describes what information we collect when you use the site at sleepeazzzy.org and
            what we do with it.
          </p>
        </div>

        <div className="lesson-block">
          <h4>What we collect</h4>
          <ul>
            <li>
              <strong>Nothing about you, by default.</strong> If you don&apos;t sign in, the only
              data the site touches is what your own browser saves locally — your progress through
              modules, your saved reframes, your bedtime routine, and your preferred language.
              None of it leaves your device.
            </li>
            <li>
              <strong>Email address (only if you sign in).</strong> When user accounts roll out,
              creating an account requires an email address so you can sign back in across
              devices.
            </li>
            <li>
              <strong>Module completion state (only if signed in).</strong> Which of the ten
              modules you&apos;ve marked complete, plus the date. This is what enables progress
              sync between your phone and your laptop.
            </li>
            <li>
              <strong>Server-side request logs.</strong> Our host (Vercel) keeps standard web
              server logs (IP address, request path, user agent) for a short period for
              operational and security purposes.
            </li>
          </ul>
        </div>

        <div className="lesson-block">
          <h4>What we don&apos;t collect</h4>
          <ul>
            <li>No sleep-diary or journal content. Reframes and routines stay on your device.</li>
            <li>
              No third-party analytics or advertising trackers. We may add a privacy-respecting,
              cookieless analytics service later — if and when we do, this page will be updated
              first.
            </li>
            <li>No payment information — the program is free.</li>
            <li>
              No health-record-style data. We are not a healthcare provider; we are not your
              clinician; Sleep Eazzzy is an educational resource.
            </li>
          </ul>
        </div>

        <div className="lesson-block">
          <h4>How we use your information</h4>
          <p>
            We use your email and completion state for exactly one purpose: to let you sign in on
            another device and resume where you left off. We do not sell, share, lease, rent, or
            otherwise transfer your information to third parties.
          </p>
        </div>

        <div className="lesson-block">
          <h4>Where it&apos;s stored</h4>
          <p>
            The site is hosted by Vercel in the United States. Account data and progress (when the
            account feature launches) will be stored in a Supabase Postgres database, also in the
            United States. Both vendors are subject to their own data processing policies.
          </p>
        </div>

        <div className="lesson-block">
          <h4>How to delete your data</h4>
          <p>
            <strong>Without an account:</strong> open your browser&apos;s site data settings for
            sleepeazzzy.org and clear it — that&apos;s all there is.
          </p>
          <p style={{ marginTop: 10 }}>
            <strong>With an account:</strong> use the &quot;Delete my account&quot; button on your
            account page (coming with the account feature). Deletion is immediate and cascades to
            all of your progress. You can also email{' '}
            <a href="mailto:privacy@sleepeazzzy.org" style={{ color: 'var(--denim)', textDecoration: 'underline' }}>
              privacy@sleepeazzzy.org
            </a>{' '}
            and we will delete your data within 30 days.
          </p>
        </div>

        <div className="lesson-block">
          <h4>Changes to this policy</h4>
          <p>
            We may revise this policy from time to time. Material changes will be posted here
            with a new &quot;Last updated&quot; date. Continued use of the site after a change
            constitutes acceptance.
          </p>
        </div>

        <div className="lesson-block">
          <h4>Not medical advice</h4>
          <p>{t('disclaimer')}</p>
        </div>

        <div className="lesson-block">
          <h4>Contact</h4>
          <p>
            Questions or concerns about your privacy:{' '}
            <a href="mailto:privacy@sleepeazzzy.org" style={{ color: 'var(--denim)', textDecoration: 'underline' }}>
              privacy@sleepeazzzy.org
            </a>
            .
          </p>
        </div>

        <p style={{ marginTop: 32, color: 'var(--muted)', fontSize: 14 }}>
          See also: <Link href={`/${lang}/terms`} style={{ color: 'var(--denim)', textDecoration: 'underline' }}>Terms</Link>
          {' · '}
          <Link href={`/${lang}/about`} style={{ color: 'var(--denim)', textDecoration: 'underline' }}>About</Link>
        </p>
      </div>
    </>
  );
}
