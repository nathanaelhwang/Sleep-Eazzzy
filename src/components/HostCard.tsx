'use client';

import type { ReactNode } from 'react';
import { useT } from './LangProvider';

/** Wendy's words for this page: a large quote, a short caption, and optionally her photo. */
export function HostCard({ quote, caption, photo }: { quote?: string; caption?: ReactNode; photo?: boolean }) {
  const t = useT();
  return (
    <figure className={'host' + (photo ? ' host-photo' : '')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {photo && <img src="/assets/wendy.png" alt="" width={88} height={96} />}
      <div>
        <blockquote className="pull">
          <p>{quote ?? t('host_quote_default')}</p>
        </blockquote>
        <figcaption className="by">{caption ?? t('mod_host_by')}</figcaption>
      </div>
    </figure>
  );
}
