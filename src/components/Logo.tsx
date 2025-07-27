import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { URLS } from '@/lib/constants';

export default function Logo() {
  const t = useTranslations('Logo');

  return (
    <Link
      href={{ pathname: URLS.HOME }}
      className='font-bold text-lg tracking-tight text-primary hover:opacity-80 transition-opacity duration-200'
      aria-label={t('text') + ' — Home'}
    >
      {t('text')}
    </Link>
  );
}
