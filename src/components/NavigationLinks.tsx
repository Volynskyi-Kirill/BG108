import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { URLS } from '@/lib/constants';

export default function NavigationLinks() {
  const t = useTranslations('Navigation');
  return (
    <div className='flex items-center gap-4'>
      <Link
        href={URLS.ABOUT}
        className='text-muted-foreground hover:text-primary transition-colors duration-200 font-medium'
      >
        {t('about')}
      </Link>
    </div>
  );
}
