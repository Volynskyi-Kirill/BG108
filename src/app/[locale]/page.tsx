import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import ShlokaList from '@/components/ShlokaList';

async function getShlokasByLocale(locale: string) {
  switch (locale) {
    case 'en':
      return (await import('../../../public/data/shlokas-eng.json')).default;
    case 'ru':
    default:
      return (await import('../../../public/data/shlokas-ru.json')).default;
  }
}

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const shlokas = use(getShlokasByLocale(locale));

  return (
    <div>
      <ShlokaList shlokas={shlokas} />
    </div>
  );
}
