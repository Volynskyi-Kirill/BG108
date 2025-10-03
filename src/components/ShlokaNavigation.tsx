import { Link } from '@/i18n/navigation';
import { URLS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShlokaNavigationProps {
  previousShloka: string | null;
  nextShloka: string | null;
  currentIndex: number;
  totalCount: number;
}

export const ShlokaNavigation: React.FC<ShlokaNavigationProps> = ({
  previousShloka,
  nextShloka,
  currentIndex,
  totalCount,
}) => {
  return (
    <div className='flex items-center justify-between w-full'>
      {/* Предыдущая шлока */}
      <div className='flex-1'>
        {previousShloka ? (
          <Link href={URLS.SHLOKA(previousShloka)}>
            <Button variant='outline' className='flex items-center gap-2'>
              <ChevronLeft className='h-4 w-4' />
              <span className='hidden sm:inline'>Предыдущая</span>
              <span className='sm:hidden'>←</span>
            </Button>
          </Link>
        ) : (
          <div className='h-10' />
        )}
      </div>

      {/* Информация о текущей позиции */}
      <div className='flex-1 text-center'>
        <span className='text-sm text-muted-foreground'>
          {currentIndex} из {totalCount}
        </span>
      </div>

      {/* Следующая шлока */}
      <div className='flex-1 flex justify-end'>
        {nextShloka ? (
          <Link href={URLS.SHLOKA(nextShloka)}>
            <Button variant='outline' className='flex items-center gap-2'>
              <span className='hidden sm:inline'>Следующая</span>
              <span className='sm:hidden'>→</span>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </Link>
        ) : (
          <div className='h-10' />
        )}
      </div>
    </div>
  );
};

export default ShlokaNavigation;
