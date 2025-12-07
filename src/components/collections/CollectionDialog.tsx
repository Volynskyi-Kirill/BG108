'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Heart, Book, Check, Folder, Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCollections } from '@/hooks/useCollections';
import type { Collection } from '@/lib/collections';

interface CollectionDialogProps {
  shlokaId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const iconMap = {
  heart: Heart,
  book: Book,
  check: Check,
  folder: Folder,
};

export function CollectionDialog({
  shlokaId,
  open,
  onOpenChange,
}: CollectionDialogProps) {
  const t = useTranslations('Collections');
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const {
    collections,
    isLoaded,
    addCollection,
    deleteCollection,
    toggleShlokaInCollection,
    isShlokaInCollection,
  } = useCollections();

  const handleToggle = (collectionId: string) => {
    toggleShlokaInCollection(collectionId, shlokaId);
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection = addCollection(newCollectionName.trim());
      toggleShlokaInCollection(newCollection.id, shlokaId);
      setNewCollectionName('');
      setIsCreating(false);
    }
  };

  const handleDeleteCollection = (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();
    deleteCollection(collectionId);
  };

  const getCollectionDisplayName = (collection: Collection): string => {
    if (collection.isDefault) {
      return t(`defaultCollections.${collection.name}`);
    }
    return collection.name;
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('selectCollection')}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
          {collections.map((collection) => {
            const Icon = iconMap[collection.icon];
            const isInCollection = isShlokaInCollection(collection.id, shlokaId);

            return (
              <div
                key={collection.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  isInCollection
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-muted/50 hover:bg-muted'
                }`}
                onClick={() => handleToggle(collection.id)}
              >
                <Icon
                  className={`size-5 ${
                    isInCollection ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span className="flex-1 font-medium">
                  {getCollectionDisplayName(collection)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {collection.shlokaIds.length}
                </span>
                {!collection.isDefault && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-destructive"
                    onClick={(e) => handleDeleteCollection(e, collection.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
                {isInCollection && (
                  <Check className="size-4 text-primary" />
                )}
              </div>
            );
          })}
        </div>

        {isCreating ? (
          <div className="flex gap-2 mt-2">
            <Input
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder={t('newCollectionPlaceholder')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateCollection();
                if (e.key === 'Escape') setIsCreating(false);
              }}
              autoFocus
            />
            <Button onClick={handleCreateCollection} size="sm">
              {t('create')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsCreating(false);
                setNewCollectionName('');
              }}
            >
              {t('cancel')}
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full mt-2 gap-2"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="size-4" />
            {t('createCollection')}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
