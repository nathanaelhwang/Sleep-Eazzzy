'use client';

import { useEffect, useState } from 'react';
import { useT } from './LangProvider';

// The initial theme is applied before paint by THEME_SCRIPT in app/layout.tsx.
const KEY = 'se_theme';

export function ThemeToggle() {
  const t = useT();
  // Unknown until mounted; the knob itself is styled from [data-theme] so it
  // is correct before hydration, only aria-pressed waits for the effect.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Hydration step: read the theme the inline script already applied.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  const toggle = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: theme still switches for this page view */
    }
    setDark(next === 'dark');
  };

  return (
    <button
      type="button"
      className="theme-btn"
      aria-pressed={dark ?? undefined}
      aria-label={t('theme_dark')}
      onClick={toggle}
    >
      <span className="knob" aria-hidden="true" />
      <span className="lbl" aria-hidden="true">
        {t('theme_dark')}
      </span>
    </button>
  );
}
