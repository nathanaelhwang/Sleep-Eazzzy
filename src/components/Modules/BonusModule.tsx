'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { useModContent, useT } from '../LangProvider';
import { Article, ModuleShell, type ModuleItem } from './Shell';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;
type Section = { h: string; p: string };

// Sections that carry safety advice stay on the page as warnings instead of
// opening behind a button: tapering off medication (module 8) and drowsy
// driving (module 10).
const WARN_SECTION: Record<number, number> = { 8: 1, 10: 4 };

export function BonusModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(mod.id) as Content;
  const sections = (c.sections as Section[] | undefined) ?? [];
  const warnAt = WARN_SECTION[mod.id];
  const warn = warnAt === undefined ? undefined : sections[warnAt];

  const items: ModuleItem[] = sections.flatMap((s, i) =>
    i === warnAt
      ? []
      : [
          {
            id: `section-${i + 1}`,
            kind: 'article' as const,
            title: s.h,
            content: (
              <Article title={s.h}>
                {i === 0 && <HostCard quote={c.hostQuote} />}
                <p dangerouslySetInnerHTML={{ __html: s.p }} />
              </Article>
            ),
          },
        ],
  );

  if (mod.id === 9) {
    items.unshift({
      id: 'pillows',
      kind: 'example',
      title: t('pos_examples_h'),
      content: (
        <Article title={t('pos_examples_h')}>
          <p>{t('pos_examples_p')}</p>
          <div className="mod-figs">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/sleep-supine.webp" alt={t('mod_pos_supine_alt')} />
              <figcaption>{t('pos_supine_cap')}</figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/sleep-side.webp" alt={t('mod_pos_side_alt')} />
              <figcaption>{t('pos_side_cap')}</figcaption>
            </figure>
          </div>
        </Article>
      ),
    });
  }

  return (
    <ModuleShell
      mod={mod}
      items={items}
      lead={<p className="mod-lede measure">{c.summary}</p>}
      notice={
        warn && (
          <Callout tone="warn" label={warn.h}>
            <p dangerouslySetInnerHTML={{ __html: warn.p }} />
          </Callout>
        )
      }
    />
  );
}
