import { Locale } from 'next-intl';
import { use } from 'react';
import { getShlokasByLocale } from '../../page';

type Props = {
  params: Promise<{ locale: Locale; shloka: string }>;
};

export default function ShlokaPage({ params }: Props) {
  const { locale, shloka } = use(params);

  const shlokas = use(getShlokasByLocale(locale));

  const shlokaData = shlokas[shloka];

  if (!shlokaData) {
    return (
      <div style={{ textAlign: 'center', marginTop: 64, fontSize: 24 }}>
        Шлока не найдена
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '48px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        {shlokaData.sanskrit.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div
        style={{
          fontSize: 18,
          color: 'var(--muted-foreground)',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        {shlokaData.wordByWord}
      </div>
      <div style={{ fontSize: 20, textAlign: 'center', marginTop: 16 }}>
        {shlokaData.translation}
      </div>
    </div>
  );
}
