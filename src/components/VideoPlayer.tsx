'use client';

import { useT } from './LangProvider';

/** 16:9 frame holding the module's YouTube embed, or a still with a note when there is no video yet. */
export function VideoPlayer({ title, videoId }: { title: string; videoId?: string }) {
  const t = useT();

  if (videoId) {
    return (
      <div className="video">
        <iframe
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
    <div className="video video-empty">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/wendy.png" alt="" width={323} height={351} />
      <p className="vtitle">{title}</p>
      <p className="vnote">{t('mod_video_none')}</p>
    </div>
  );
}
