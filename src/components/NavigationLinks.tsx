'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { URLS } from '@/lib/constants';

const NAV_LINKS = [
  { key: 'profile', href: URLS.PROFILE },
  { key: 'about', href: URLS.ABOUT },
];

export default function NavigationLinks() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <div className='flex items-center gap-4'>
      {NAV_LINKS.map(({ key, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={key}
            href={href}
            className={
              'transition-colors duration-200 font-medium ' +
              (isActive
                ? 'underline underline-offset-4 text-primary'
                : 'text-muted-foreground hover:text-primary')
            }
            aria-current={isActive ? 'page' : undefined}
          >
            {t(key)}
          </Link>
        );
      })}
    </div>
  );
}
