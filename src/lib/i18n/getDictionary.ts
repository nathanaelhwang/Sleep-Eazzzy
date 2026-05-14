import type { Dictionary, Locale } from './types';
import { DEFAULT_LOCALE } from './types';

const loaders = {
  en: () => import('./en').then((m) => m.dict),
  es: () => import('./es').then((m) => m.dict),
  'zh-Hant': () => import('./zh-Hant').then((m) => m.dict),
  'zh-Hans': () => import('./zh-Hans').then((m) => m.dict),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export const LOCALES = Object.keys(loaders) as Locale[];

export function isLocale(s: string): s is Locale {
  return s in loaders;
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  return isLocale(locale) ? loaders[locale]() : loaders[DEFAULT_LOCALE]();
}

export { DEFAULT_LOCALE };
export type { Dictionary, Locale } from './types';
