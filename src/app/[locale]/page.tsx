import { Locale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('HomePage');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href='/about'>{t('about')}</Link>
    </div>
  );
}
