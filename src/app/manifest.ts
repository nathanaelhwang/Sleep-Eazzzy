import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SleepEazzzy',
    short_name: 'SleepEazzzy',
    description: 'A free, video-guided course in CBT-I: seven short modules to help you sleep better without sleeping pills.',
    start_url: '/',
    display: 'standalone',
    background_color: '#161B26',
    theme_color: '#161B26',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
