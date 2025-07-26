'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { Locale } from 'next-intl';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className={clsx(
        'relative text-muted-foreground',
        isPending && 'transition-opacity opacity-50 cursor-not-allowed'
      )}
    >
      <p className='sr-only'>{label}</p>
      <select
        className={clsx(
          'inline-flex w-full appearance-none rounded-md bg-input text-foreground',
          'py-2 pl-3 pr-8 text-sm shadow-sm',
          'border border-border focus:outline-none focus:ring-2 focus:ring-ring',
          isPending && 'opacity-50 cursor-not-allowed'
        )}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className='absolute right-2 top-2 pointer-events-none text-foreground'>
        ⌄
      </span>
    </label>
  );
}
