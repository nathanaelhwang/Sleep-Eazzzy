'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { useDict, useModContent, useT } from '../LangProvider';
import { Article, ModuleShell, type ModuleItem } from './Shell';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function HygieneModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(3) as Content;
  const hyg = useDict().hygiene;

  const items: ModuleItem[] = [
    {
      id: 'habits',
      kind: 'article',
      // Do and Don't sit side by side as a comparison, so this one needs a wider sheet.
      wide: true,
      title: t('mod_hyg_h'),
      content: (
        <Article title={t('mod_hyg_h')}>
          <HostCard quote={c.hostQuote} />
          <div className="dd">
            <div>
              <h3 className="dd-do">{hyg.do_label}</h3>
              <ul className="rows">
                {hyg.dos.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="dd-dont">{hyg.dont_label}</h3>
              <ul className="rows">
                {hyg.donts.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </Article>
      ),
    },
    {
      id: 'blue-light',
      kind: 'article',
      title: c.blue_h,
      content: (
        <Article title={c.blue_h}>
          <p>{t('mod_blue_ios')}</p>
          <p>{t('mod_blue_android')}</p>
          <p>{c.blue_p3}</p>
          <Callout label={c.rule_label}>{c.rule}</Callout>
        </Article>
      ),
    },
  ];

  return <ModuleShell mod={mod} items={items} />;
}
