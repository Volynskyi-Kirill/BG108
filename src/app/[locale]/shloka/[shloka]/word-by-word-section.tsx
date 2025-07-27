'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WordByWordSectionProps {
  wordByWord: string;
}

function parseWordByWord(text: string) {
  return text
    .split(';')
    .map((part) => {
      const trimmed = part.trim();
      // Ищем санскритское слово до первого тире
      const match = trimmed.match(/^([^—-]+)[\s]*[—-][\s]*(.+)$/);

      if (match) {
        return {
          sanskrit: match[1].trim(),
          translation: match[2].trim(),
        };
      }

      return null;
    })
    .filter(
      (item): item is { sanskrit: string; translation: string } => item !== null
    );
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
                className='flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 rounded-lg bg-muted/30'
              >
                {/* Санскритское слово */}
                <div className='flex-shrink-0'>
                  <span className='inline-block px-2 py-1 bg-primary/10 text-primary font-medium text-sm rounded border'>
                    {item.sanskrit}
                  </span>
                </div>

                {/* Перевод */}
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
