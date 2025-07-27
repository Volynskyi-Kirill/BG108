import { Link } from '@/i18n/navigation';
import { URLS } from '@/lib/constants';
import React from 'react';

export interface Shloka {
  sanskrit: string;
  wordByWord: string;
  translation: string;
}

export interface ShlokaCollection {
  [key: string]: Shloka;
}

interface ShlokaListProps {
  shlokas: Record<string, Shloka>;
}

const getFirstLine = (text: string) => {
  const [firstLine] = text.split('\n');
  return firstLine;
};

export const ShlokaList: React.FC<ShlokaListProps> = ({ shlokas }) => {
  return (
    <div className='flex flex-col gap-4'>
      {Object.entries(shlokas).map(([shlokaNumber, shloka]) => (
        <div key={shlokaNumber} className='shloka-card'>
          <div className='shloka-number'>{shlokaNumber}</div>
          <Link href={URLS.SHLOKA(shlokaNumber)} className='shloka-link'>
            {getFirstLine(shloka.sanskrit)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShlokaList;
