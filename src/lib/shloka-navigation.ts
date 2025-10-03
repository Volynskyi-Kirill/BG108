import { ShlokaCollection } from '@/components/ShlokaList';

/**
 * Получает упорядоченный список номеров шлок из коллекции
 */
export function getShlokaNumbers(shlokas: ShlokaCollection): string[] {
  return Object.keys(shlokas).sort((a, b) => {
    // Сортируем по главе, затем по номеру стиха
    const [chapterA, verseA] = a.split('.').map(Number);
    const [chapterB, verseB] = b.split('.').map(Number);

    if (chapterA !== chapterB) {
      return chapterA - chapterB;
    }
    return verseA - verseB;
  });
}

/**
 * Получает информацию о навигации для текущей шлоки
 */
export function getShlokaNavigation(
  currentShloka: string,
  shlokas: ShlokaCollection
): {
  previousShloka: string | null;
  nextShloka: string | null;
  currentIndex: number;
  totalCount: number;
} {
  const shlokaNumbers = getShlokaNumbers(shlokas);
  const currentIndex = shlokaNumbers.indexOf(currentShloka);

  if (currentIndex === -1) {
    return {
      previousShloka: null,
      nextShloka: null,
      currentIndex: -1,
      totalCount: shlokaNumbers.length,
    };
  }

  return {
    previousShloka: currentIndex > 0 ? shlokaNumbers[currentIndex - 1] : null,
    nextShloka:
      currentIndex < shlokaNumbers.length - 1
        ? shlokaNumbers[currentIndex + 1]
        : null,
    currentIndex: currentIndex + 1, // 1-based index for display
    totalCount: shlokaNumbers.length,
  };
}
