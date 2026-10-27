import type { ReactNode } from 'react';

/** Side note with a top rule (`.note`); `tone="warn"` is the amber safety callout (`.warn`). */
export function Callout({
  label,
  tone,
  children,
}: {
  label?: string;
  tone?: 'warn';
  children: ReactNode;
}) {
  return (
    <div className={tone === 'warn' ? 'warn' : 'note'} role={tone === 'warn' ? 'note' : undefined}>
      {label && <h3>{label}</h3>}
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}
