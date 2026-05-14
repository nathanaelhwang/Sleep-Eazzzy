'use client';

import { useT } from './LangProvider';

export function HostCard({ quote }: { quote?: string }) {
  const t = useT();
  return (
    <div className="host-card">
      <div className="host-stars" aria-hidden="true">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <circle cx="20%" cy="30%" r="1" fill="#c9b89a" opacity="0.5" />
          <circle cx="80%" cy="20%" r="1.5" fill="#c9b89a" opacity="0.7" />
          <circle cx="60%" cy="70%" r="1" fill="#fff" opacity="0.4" />
          <circle cx="30%" cy="80%" r="1" fill="#c9b89a" opacity="0.5" />
          <circle cx="90%" cy="55%" r="1" fill="#fff" opacity="0.3" />
        </svg>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/wendy.png" alt="Wendy, your CBT-I guide" className="host-photo" />
      <div className="host-card-name">Wendy</div>
      <div className="host-card-role">{t('host_role')}</div>
      <div className="host-card-quote">{quote ?? t('host_quote_default')}</div>
    </div>
  );
}
