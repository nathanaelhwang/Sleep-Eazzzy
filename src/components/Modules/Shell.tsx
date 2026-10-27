'use client';

import { Suspense, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Module } from '@/lib/data';
import { fillText } from '../fill';
import { useNum, useT } from '../LangProvider';
import { MarkComplete } from '../MarkComplete';
import { ModuleDisclaimer } from '../ModuleDisclaimer';
import { ModuleHero } from '../ModuleHero';
import { ModuleNav } from '../ModuleNav';
import { VideoPlayer } from '../VideoPlayer';

export type ItemKind = 'article' | 'quiz' | 'tool' | 'example' | 'chart';

/**
 * One thing a module offers besides its video. Items open in the side sheet;
 * `id` doubles as the `?tool=` deep-link value (reframe, breathing, pmr, calc…).
 */
export type ModuleItem = {
  id: string;
  kind: ItemKind;
  title: string;
  content: ReactNode;
  /** Content laid out side by side (e.g. a comparison) gets a wider sheet. */
  wide?: boolean;
};

const SHEET_ID = 'mod-sheet';
// Below this width the sheet covers the page instead of sitting beside it (module.css).
const NARROW = '(max-width: 900px)';

function useNarrow(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(NARROW);
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia(NARROW).matches,
    () => false,
  );
}

/** Mirror the open item into `?tool=` so a refresh or a shared link reopens it. */
function writeQuery(id: string | null) {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set('tool', id);
  else url.searchParams.delete('tool');
  window.history.replaceState(null, '', url);
}

/** Opens the item named in `?tool=` once, on arrival. Isolated so only it waits on search params. */
function QueryOpener({ onOpen }: { onOpen: (id: string) => void }) {
  const tool = useSearchParams().get('tool');
  const handled = useRef(false);
  useEffect(() => {
    if (handled.current) return;
    handled.current = true;
    if (tool) onOpen(tool);
  }, [tool, onOpen]);
  return null;
}

/**
 * Every module page: title, video, and a list of items. Opening an item slides
 * the page aside and brings the item in as a floating sheet beside it (or over
 * it on narrow screens). One item is open at a time; all stay mounted so a
 * half-finished quiz or timer survives switching between them.
 */
export function ModuleShell({
  mod,
  items,
  lead,
  notice,
}: {
  mod: Module;
  items: ModuleItem[];
  /** Replaces the video (bonus topics have none). */
  lead?: ReactNode;
  /** Safety information that must stay on the page, not behind a button. */
  notice?: ReactNode;
}) {
  const t = useT();
  const num = useNum();
  const narrow = useNarrow();
  const [open, setOpen] = useState<string | null>(null);
  // Last opened item: stays rendered while the sheet animates closed.
  const [shown, setShown] = useState<string | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const focusOnOpen = useRef(false);

  const openItem = useCallback(
    (id: string, focus = true) => {
      if (!items.some((it) => it.id === id)) return;
      focusOnOpen.current = focus;
      setOpen(id);
      setShown(id);
      writeQuery(id);
    },
    [items],
  );
  const openFromQuery = useCallback((id: string) => openItem(id, false), [openItem]);

  const close = useCallback(() => {
    if (!open) return;
    setOpen(null);
    writeQuery(null);
    document.querySelector<HTMLElement>(`[data-item="${open}"]`)?.focus({ preventScroll: true });
  }, [open]);

  // New item: start the sheet at its top and, if the reader asked for it, move focus there.
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!open || !sheet) return;
    sheet.scrollTop = 0;
    if (focusOnOpen.current) sheet.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // On narrow screens the sheet is modal: lock page scroll and take the header/footer out of reach.
  useEffect(() => {
    if (!open || !narrow) return;
    const root = document.documentElement;
    const chrome = document.querySelectorAll<HTMLElement>('.site-header, .site-footer, .skip');
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    chrome.forEach((el) => (el.inert = true));
    return () => {
      root.style.overflow = overflow;
      chrome.forEach((el) => (el.inert = false));
    };
  }, [open, narrow]);

  const idx = items.findIndex((it) => it.id === shown);
  const current = idx >= 0 ? items[idx] : null;
  const next = idx >= 0 ? items[idx + 1] : undefined;
  const videoTitle = mod.bonus ? mod.title : fillText(t('mod_video_title'), { n: num(mod.id), title: mod.title });

  return (
    <div className="mod-stage" data-open={open ? '' : undefined} data-wide={current?.wide ? '' : undefined}>
      <div className="mod-main" inert={narrow && !!open}>
        <div className="mod-main-inner">
          <ModuleHero mod={mod} />
          <ModuleDisclaimer />
          <div className="mod-lead">{lead ?? <VideoPlayer title={videoTitle} videoId={mod.videoId} />}</div>
          {notice && <div className="mod-notice">{notice}</div>}

          {items.length > 0 && (
            <section className="mod-items-wrap" aria-labelledby="h-items">
              <h2 id="h-items" className="mod-items-h">
                {t('item_list_h')}
              </h2>
              <ul className="mod-items">
                {items.map((it) => (
                  <li key={it.id}>
                    <button
                      type="button"
                      className="mod-item"
                      data-item={it.id}
                      aria-expanded={open === it.id}
                      aria-controls={SHEET_ID}
                      onClick={() => (open === it.id ? close() : openItem(it.id))}
                    >
                      <span className="mod-item-t">{it.title}</span>
                      <span className="mod-item-k">{t(`item_kind_${it.kind}`)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mod-end">
            <MarkComplete moduleId={mod.id} />
            <ModuleNav current={mod.id} />
          </div>
        </div>
      </div>

      <aside
        id={SHEET_ID}
        className="mod-sheet"
        aria-label={current?.title}
        role={narrow ? 'dialog' : undefined}
        aria-modal={narrow && open ? true : undefined}
        inert={!open}
      >
        <div className="mod-sheet-inner" ref={sheetRef} tabIndex={-1}>
          <div className="mod-sheet-bar">
            <span className="mod-sheet-kind">{current && t(`item_kind_${current.kind}`)}</span>
            <button type="button" className="mod-sheet-close" onClick={close} aria-label={t('panel_close')}>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="mod-sheet-body">
            {items.map((it) => (
              <div key={it.id} id={`tool-${it.id}`} className="sheet-item" hidden={it.id !== shown}>
                {it.content}
              </div>
            ))}
          </div>
          {next && (
            <div className="mod-sheet-foot">
              <button type="button" className="btn btn-quiet" onClick={() => openItem(next.id)}>
                {fillText(t('panel_next'), { title: next.title })}
              </button>
            </div>
          )}
        </div>
      </aside>

      <Suspense fallback={null}>
        <QueryOpener onOpen={openFromQuery} />
      </Suspense>
    </div>
  );
}

/** Heading + body for an article item in the sheet. */
export function Article({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="prose sheet-article">
      <h2>{title}</h2>
      {children}
    </article>
  );
}
