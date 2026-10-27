'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthNav } from './AuthNav';
import { BrandMark } from './BrandMark';
import { useLang, useT } from './LangProvider';
import { LangToggle } from './LangToggle';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  const lang = useLang();
  const t = useT();
  const pathname = usePathname();
  const prefix = `/${lang}`;

  const links = [
    { href: prefix,              label: t('home'),        match: (p: string) => p === prefix || p === `${prefix}/` },
    { href: `${prefix}/modules`, label: t('nav_program'), match: (p: string) => p.startsWith(`${prefix}/module`) },
    { href: `${prefix}/tools`,   label: t('tools'),       match: (p: string) => p === `${prefix}/tools` },
    { href: `${prefix}/library`, label: t('nav_sounds'),  match: (p: string) => p === `${prefix}/library` },
    { href: `${prefix}/about`,   label: t('about'),       match: (p: string) => p === `${prefix}/about` },
  ];

  return (
    <>
      <a className="skip" href="#main">
        {t('skip_to_content')}
      </a>
      <header className="site-header">
        <div className="wrap">
          <Link href={prefix} className="brand">
            <BrandMark />
            SleepEazzzy
          </Link>
          <nav className="nav" aria-label={t('nav_main')}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={l.match(pathname) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="header-tools">
            <LangToggle />
            <ThemeToggle />
            <AuthNav />
          </div>
        </div>
      </header>
    </>
  );
}
