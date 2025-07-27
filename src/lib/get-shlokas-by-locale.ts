import { ShlokaCollection } from '@/components/ShlokaList';

//TODO move to next-intl?
export async function getShlokasByLocale(
  locale: string
): Promise<ShlokaCollection> {
  switch (locale) {
    case 'en':
      return (await import('@data/shlokas-eng.json')).default;
    case 'ru':
    default:
      return (await import('@data/shlokas-ru.json')).default;
  }
}
