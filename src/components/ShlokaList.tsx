import React from 'react';
import Link from 'next/link';

interface Shloka {
  sanskrit: string;
  wordByWord: string;
  translation: string;
}

interface ShlokaListProps {
  shlokas: Record<string, Shloka>;
  locale: string;
}

const getFirstLine = (text: string) => {
  const [firstLine] = text.split('\n');
  return firstLine;
};

export const ShlokaList: React.FC<ShlokaListProps> = ({ shlokas, locale }) => {
  return (
    <div
      className='shloka-list'
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {Object.entries(shlokas).map(([shlokaNumber, shloka]) => (
        <div key={shlokaNumber} className='shloka-card'>
          <div className='shloka-number'>{shlokaNumber}</div>
          <Link
            href={`/${locale}/shloka/${shlokaNumber}`}
            className='shloka-link'
            prefetch={false}
          >
            {getFirstLine(shloka.sanskrit)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShlokaList;
