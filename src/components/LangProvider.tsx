'use client';

import { createContext, useContext, useEffect } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n/types';
import type { Module } from '@/lib/data';

type Ctx = { lang: Locale; dict: Dictionary };

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  // Root <html lang> is hardcoded to "en" in app/layout.tsx because that layout
  // can't read [lang] params. Sync it here so screen readers and Lighthouse see
  // the active locale. Also flip dir for RTL scripts (fa).
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  return <LangContext.Provider value={{ lang, dict }}>{children}</LangContext.Provider>;
}

function useCtx(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('Missing <LangProvider>');
  return ctx;
}

export function useLang(): Locale {
  return useCtx().lang;
}

export function useDict(): Dictionary {
  return useCtx().dict;
}

export function useT(): (k: string) => string {
  const { dict } = useCtx();
  return (k: string) => {
    const v = dict.t[k];
    return typeof v === 'string' ? v : k;
  };
}

export function useTArr(): (k: string) => readonly string[] {
  const { dict } = useCtx();
  return (k: string) => {
    const v = dict.t[k];
    return Array.isArray(v) ? v : [];
  };
}

export function useModules(): Module[] {
  return useCtx().dict.modules;
}

export function useModContent(id: number): Record<string, unknown> {
  return useCtx().dict.moduleContent[id] ?? {};
}

// Inline locale string picker — kept for one-off strings not in the dictionary
// (matches the L() helper used in the original LibraryPage / ToolsPage).
export function useL(): (en: string, es: string, zhHant: string, zhHans: string, ko?: string, fa?: string, vi?: string, hi?: string) => string {
  const lang = useLang();
  return (en, es, zhHant, zhHans, ko, fa, vi, hi) => {
    switch (lang) {
      case 'es': return es;
      case 'zh-Hant': return zhHant;
      case 'zh-Hans': return zhHans;
      case 'ko': return ko ?? en;
      case 'fa': return fa ?? en;
      case 'vi': return vi ?? en;
      case 'hi': return hi ?? en;
      default: return en;
    }
  };
}
