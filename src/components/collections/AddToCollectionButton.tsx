'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CollectionDialog } from './CollectionDialog';
import { useCollections } from '@/hooks/useCollections';

interface AddToCollectionButtonProps {
  shlokaId: string;
  variant?: 'icon' | 'button';
  size?: 'sm' | 'default';
}

export function AddToCollectionButton({
  shlokaId,
  variant = 'icon',
  size = 'sm',
}: AddToCollectionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Collections');
  const { getShlokaCollections, isLoaded } = useCollections();

  // Check if shloka is in any collection
  const shlokaCollections = isLoaded ? getShlokaCollections(shlokaId) : [];
  const isInAnyCollection = shlokaCollections.length > 0;

  const Icon = isInAnyCollection ? BookmarkCheck : Bookmark;

  if (variant === 'icon') {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className={`${size === 'sm' ? 'size-8' : 'size-10'} ${
            isInAnyCollection ? 'text-primary' : ''
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
          aria-label={t('addToCollection')}
        >
          <Icon
            className={`${size === 'sm' ? 'size-4' : 'size-5'} ${
              isInAnyCollection ? 'fill-current' : ''
            }`}
          />
        </Button>
        <CollectionDialog
          shlokaId={shlokaId}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      </>
    );
  }

  return (
    <>
      <Button
        variant={isInAnyCollection ? 'default' : 'outline'}
        size={size}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="gap-2"
      >
        <Icon className={`size-4 ${isInAnyCollection ? 'fill-current' : ''}`} />
        {isInAnyCollection ? t('inCollection') : t('addToCollection')}
      </Button>
      <CollectionDialog
        shlokaId={shlokaId}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
