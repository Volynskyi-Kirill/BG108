'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

//TODO localization!

interface WordByWordSectionProps {
  wordByWord: string;
}

function parseWordByWord(text: string) {
  return text
    .split(';')
    .map((part) => {
      const trimmed = part.trim();

      // Ищем разделитель " — " (пробел-тире-пробел) между санскритом и переводом
      const separatorIndex = trimmed.indexOf(' — ');

      if (separatorIndex !== -1) {
        return {
          sanskrit: trimmed.substring(0, separatorIndex).trim(),
          translation: trimmed.substring(separatorIndex + 3).trim(), // +3 для " — "
        };
      }

      // Если не найден " — ", пробуем обычное тире с пробелами
      const dashMatch = trimmed.match(/^(.+?)\s+—\s+(.+)$/);
      if (dashMatch) {
        return {
          sanskrit: dashMatch[1].trim(),
          translation: dashMatch[2].trim(),
        };
      }

      // Если не найден разделитель, возможно это просто перевод без санскрита
      return {
        sanskrit: '',
        translation: trimmed,
      };
    })
    .filter((item) => item.translation.length > 0); // Убираем пустые переводы
}

export default function WordByWordSection({
  wordByWord,
}: WordByWordSectionProps) {
  const [showWordByWord, setShowWordByWord] = useState(false);
  const wordByWordParsed = parseWordByWord(wordByWord);

  return (
    <div className='space-y-4'>
      <Button
        variant='ghost'
        onClick={() => setShowWordByWord(!showWordByWord)}
        className='w-full flex items-center justify-center gap-2 text-sm font-medium'
      >
        Пословный перевод
        {showWordByWord ? (
          <ChevronUp className='h-4 w-4' />
        ) : (
          <ChevronDown className='h-4 w-4' />
        )}
      </Button>

      {showWordByWord && (
        <div className='space-y-3 pt-4 border-t'>
          <div className='grid gap-3 sm:gap-2'>
            {wordByWordParsed.map((item, index) => (
              <div
                key={index}
                className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 p-3 rounded-lg bg-muted/30'
              >
                <div className='flex-shrink-0'>
                  <span className='inline-block px-2 py-1 bg-primary/10 text-primary font-medium text-sm rounded border'>
                    {item.sanskrit}
                  </span>
                </div>

                <div className='hidden sm:block text-muted-foreground'>—</div>

                <div className='flex-1 text-sm text-muted-foreground leading-relaxed'>
                  {item.translation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
