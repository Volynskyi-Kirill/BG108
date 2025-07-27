import type { Locale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WordByWordSection from './word-by-word-section';
import { getShlokasByLocale } from '@/lib/get-shlokas-by-locale';

//TODO localization!

type Props = {
  params: Promise<{ locale: Locale; shloka: string }>;
};

export default async function ShlokaPage({ params }: Props) {
  const { locale, shloka } = await params;
  const shlokas = await getShlokasByLocale(locale);
  const shlokaData = shlokas[shloka];

  if (!shlokaData) {
    return (
      <div className='flex items-center justify-center min-h-[50vh]'>
        <Card className='w-full max-w-md'>
          <CardContent className='pt-6'>
            <div className='text-center text-muted-foreground'>
              <h2 className='text-2xl font-semibold mb-2'>Шлока не найдена</h2>
              <p>Проверьте правильность номера шлоки</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <Card className='w-full'>
        <CardHeader className='text-center pb-6'>
          <CardTitle className='text-sm text-muted-foreground font-medium mb-4'>
            Шлока {shloka}
          </CardTitle>

          {/* Санскритский текст */}
          <div className='space-y-2'>
            {shlokaData.sanskrit.split('\n').map((line, i) => (
              <div
                key={i}
                className='text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-primary'
              >
                {line}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Пословный перевод - между санскритом и переводом */}
          <WordByWordSection wordByWord={shlokaData.wordByWord} />

          <Separator />

          {/* Перевод */}
          <div className='text-center'>
            <h3 className='text-lg font-semibold mb-3 text-foreground'>
              Перевод
            </h3>
            <p className='text-base md:text-lg leading-relaxed text-muted-foreground'>
              {shlokaData.translation}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
