import ShlokaList, { ShlokaCollection } from '@/components/ShlokaList';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

//TODO move to next-intl?
export async function getShlokasByLocale(locale: string): Promise<ShlokaCollection> {
  switch (locale) {
    case 'en':
      return (await import('@data/shlokas-eng.json')).default;
    case 'ru':
    default:
      return (await import('@data/shlokas-ru.json')).default;
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
