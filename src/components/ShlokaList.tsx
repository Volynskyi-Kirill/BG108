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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {Object.entries(shlokas).map(([shlokaNumber, shloka]) => (
        <div
          key={shlokaNumber}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px 16px',
            background: '#fafafa',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              minWidth: 56,
              fontWeight: 600,
              color: '#6366f1',
              fontSize: 18,
            }}
          >
            {shlokaNumber}
          </div>
          <Link
            href={`/${locale}/shloka/${shlokaNumber}`}
            style={{
              marginLeft: 16,
              color: '#111827',
              textDecoration: 'none',
              fontSize: 16,
              cursor: 'pointer',
              flex: 1,
              transition: 'color 0.2s',
            }}
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
