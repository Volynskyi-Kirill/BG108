'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { URLS } from '@/lib/constants';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';

const NAV_LINKS = [{ key: 'about', href: URLS.ABOUT }];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        
        <nav className="flex flex-col gap-2 mt-4">
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                onClick={() => setIsOpen(false)}
                className={
                  'px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ' +
                  (isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')
                }
                aria-current={isActive ? 'page' : undefined}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t flex items-center justify-between">
          <LocaleSwitcher aria-label="Change language" />
          <ThemeModeToggle aria-label="Toggle theme" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
