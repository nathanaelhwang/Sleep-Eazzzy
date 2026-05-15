'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthNav } from './AuthNav';
import { useLang, useT } from './LangProvider';
import { BrandMark } from './BrandMark';
import { LangToggle } from './LangToggle';

export function Nav() {
  const lang = useLang();
  const t = useT();
  const pathname = usePathname();
  const prefix = `/${lang}`;

  const links = [
    { href: prefix,                 label: t('home'),    match: (p: string) => p === prefix || p === `${prefix}/` },
    { href: `${prefix}/modules`,    label: t('modules'), match: (p: string) => p.startsWith(`${prefix}/module`) },
    { href: `${prefix}/tools`,      label: t('tools'),   match: (p: string) => p === `${prefix}/tools` },
    { href: `${prefix}/library`,    label: t('library'), match: (p: string) => p === `${prefix}/library` },
    { href: `${prefix}/about`,      label: t('about'),   match: (p: string) => p === `${prefix}/about` },
  ];

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href={prefix} className="brand" style={{ textDecoration: 'none' }}>
          <BrandMark />
          <span>Sleep Ea<span className="brand-z">zzz</span>y</span>
        </Link>
        <div className="nav-links">
          {links.map((l) => {
            const isActive = l.match(pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={'nav-link' + (isActive ? ' active' : '')}
                style={{ textDecoration: 'none' }}
                aria-current={isActive ? 'page' : undefined}
              >
                {l.label}
              </Link>
            );
          })}
          <LangToggle />
          <AuthNav />
        </div>
      </div>
    </nav>
  );
}
