import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sleep Eazzzy — A free CBT-I patient program';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'linear-gradient(180deg, #0f1e3a 0%, #1e3a5f 60%, #2d4a73 100%)',
          color: '#f4f1ec',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Star sprinkle — fixed positions for consistent rendering */}
        {[
          [120, 90, 3, 0.6],
          [330, 140, 2, 0.5],
          [880, 100, 4, 0.7],
          [1060, 200, 2, 0.5],
          [200, 480, 2, 0.5],
          [950, 540, 3, 0.6],
          [560, 80, 2, 0.45],
        ].map(([x, y, r, op], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x as number,
              top: y as number,
              width: (r as number) * 2,
              height: (r as number) * 2,
              borderRadius: '50%',
              background: '#f4f1ec',
              opacity: op as number,
              display: 'flex',
            }}
          />
        ))}

        {/* Crescent moon */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 28 28"
          style={{ marginBottom: 40 }}
        >
          <circle cx="14" cy="14" r="13" fill="#0f1e3a" stroke="#c9b89a" strokeWidth="0.5" />
          <path d="M18.5 16.5a6 6 0 0 1-8-8 6 6 0 1 0 8 8z" fill="#c9b89a" />
        </svg>

        <div
          style={{
            fontSize: 128,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            display: 'flex',
            lineHeight: 1,
          }}
        >
          <span>Sleep&nbsp;Ea</span>
          <span style={{ color: '#c9b89a' }}>zzz</span>
          <span>y</span>
        </div>

        <div
          style={{
            fontSize: 36,
            marginTop: 36,
            opacity: 0.88,
            letterSpacing: '0.01em',
            textAlign: 'center',
          }}
        >
          A free CBT-I patient program
        </div>

        <div
          style={{
            fontSize: 22,
            marginTop: 14,
            opacity: 0.65,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Sleep better, without the pills
        </div>
      </div>
    ),
    { ...size }
  );
}
