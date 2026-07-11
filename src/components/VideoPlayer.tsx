'use client';

import { useT } from './LangProvider';

export function VideoPlayer({ title, time, videoId }: { title: string; time?: string; videoId?: string }) {
  const t = useT();

  if (videoId) {
    return (
      <div className="video-card video-card-embed">
        <iframe
          className="video-embed"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

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
