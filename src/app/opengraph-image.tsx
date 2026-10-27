import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SleepEazzzy: a free, video-guided CBT-I course for insomnia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The image route can't read CSS variables, so the dark-theme palette is inlined.
const PAGE = '#161B26';
const AWAKE = '#E6B04F';
const ASLEEP = '#8C9CC8';
const INK = '#E7EAF0';
const MUTED = '#9AA3B2';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: PAGE,
          color: INK,
          padding: '0 104px',
        }}
      >
        {/* Brand mark (see components/BrandMark.tsx): a night in bed with sleep inside it, then a full night of sleep. */}
        <svg width="312" height="216" viewBox="0 0 26 18">
          <rect x="0" y="2" width="26" height="5" rx="1" fill={AWAKE} />
          <rect x="8" y="2" width="14" height="5" fill={ASLEEP} />
          <rect x="0" y="11" width="26" height="5" rx="1" fill={ASLEEP} />
        </svg>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 112, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
          SleepEazzzy
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 40, color: MUTED, lineHeight: 1.3, maxWidth: 900 }}>
          Spend less time lying awake. A free, video-guided course in CBT-I for insomnia.
        </div>
      </div>
    ),
    { ...size }
  );
}
