'use client';

import { useT } from './LangProvider';

export function VideoPlayer({ title, time }: { title: string; time?: string }) {
  const t = useT();
  return (
    <div className="video-card">
      <div className="video-ph-text">{t('video_placeholder')}</div>
      <div className="video-play" title={t('video_play')}>
        <span style={{ marginLeft: 4 }}>▶</span>
      </div>
      <div className="video-meta">
        <div className="video-title">{title}</div>
        {time && <div className="video-time">{time}</div>}
      </div>
    </div>
  );
}
