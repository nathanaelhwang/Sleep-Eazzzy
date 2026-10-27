import { Fragment, type ReactNode } from 'react';

// Translated strings carry `{name}` slots so each locale can place values
// wherever its word order needs them.

/** Fill `{name}` slots with plain values (for text and attributes). */
export function fillText(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Fill `{name}` slots with React nodes (e.g. a bold duration or a link). */
export function fill(tpl: string, vars: Record<string, ReactNode>): ReactNode[] {
  return tpl.split(/\{(\w+)\}/).map((part, i) =>
    i % 2 === 1 ? <Fragment key={i}>{part in vars ? vars[part] : `{${part}}`}</Fragment> : part,
  );
}
