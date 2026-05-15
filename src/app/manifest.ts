import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sleep Eazzzy',
    short_name: 'Sleep Eazzzy',
    description:
      'A free CBT-I patient program — seven short modules to help you sleep better, without the pills.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f1ec',
    theme_color: '#0f1e3a',
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
