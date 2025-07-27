import ShlokaList from '@/components/ShlokaList';
import { getShlokasByLocale } from '@/lib/get-shlokas-by-locale';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

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
