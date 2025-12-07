'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Heart, Book, Check, Folder, ChevronRight, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/hooks/useCollections';
import { URLS } from '@/lib/constants';
import type { Collection } from '@/lib/collections';

const iconMap = {
  heart: Heart,
  book: Book,
  check: Check,
  folder: Folder,
};

interface CollectionCardProps {
  collection: Collection;
  onDelete?: (id: string) => void;
}

export function CollectionCard({ collection, onDelete }: CollectionCardProps) {
  const t = useTranslations('Collections');
  const Icon = iconMap[collection.icon];

  const displayName = collection.isDefault
    ? t(`defaultCollections.${collection.name}`)
    : collection.name;

  return (
    <Link href={URLS.COLLECTION(collection.id)}>
      <Card className="group hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Icon className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{displayName}</h3>
              <p className="text-sm text-muted-foreground">
                {t('shlokaCount', { count: collection.shlokaIds.length })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {!collection.isDefault && onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(collection.id);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              )}
              <ChevronRight className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function CollectionsList() {
  const t = useTranslations('Collections');
  const { collections, isLoaded, deleteCollection } = useCollections();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">{t('loading')}</div>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Folder className="size-12 text-muted-foreground mb-4" />
        <h3 className="font-semibold text-lg mb-2">{t('noCollections')}</h3>
        <p className="text-muted-foreground">{t('noCollectionsHint')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          onDelete={deleteCollection}
        />
      ))}
    </div>
  );
}
