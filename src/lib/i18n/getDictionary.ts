import type { Dictionary, Locale } from './types';
import { DEFAULT_LOCALE } from './types';
import { MODULES } from '../data';

const loaders = {
  en: () => import('./en').then((m) => m.dict),
  es: () => import('./es').then((m) => m.dict),
  'zh-Hant': () => import('./zh-Hant').then((m) => m.dict),
  'zh-Hans': () => import('./zh-Hans').then((m) => m.dict),
  ko: () => import('./ko').then((m) => m.dict),
  fa: () => import('./fa').then((m) => m.dict),
  vi: () => import('./vi').then((m) => m.dict),
  hi: () => import('./hi').then((m) => m.dict),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export const LOCALES = Object.keys(loaders) as Locale[];

export function isLocale(s: string): s is Locale {
  return s in loaders;
}

// Video IDs are locale-independent; MODULES in data.ts is their single source
// of truth, so localized module lists don't each have to repeat them.
const VIDEO_IDS = new Map(MODULES.map((m) => [m.id, m.videoId]));

export async function getDictionary(locale: string): Promise<Dictionary> {
  const dict = await (isLocale(locale) ? loaders[locale]() : loaders[DEFAULT_LOCALE]());
  return {
    ...dict,
    modules: dict.modules.map((m) => ({ ...m, videoId: m.videoId ?? VIDEO_IDS.get(m.id) })),
  };
}

export { DEFAULT_LOCALE };
export type { Dictionary, Locale } from './types';
