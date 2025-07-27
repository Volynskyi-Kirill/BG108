import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import ShlokaList from '../../components/ShlokaList';
import shlokas from '../../../public/data/shlokas-ru.json';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);

  setRequestLocale(locale);

  return (
    <div>
      <ShlokaList shlokas={shlokas} />
    </div>
  );
}
