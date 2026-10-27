import type { ReactNode } from 'react';

/** A line from the lesson set large, to slow the reader down. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mod-pull">
      <p>{children}</p>
    </blockquote>
  );
}
