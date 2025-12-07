'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCollections } from '@/hooks/useCollections';
import { URLS } from '@/lib/constants';

type Props = {
  params: Promise<{ id: string }>;
};

type ShlokaData = {
  sanskrit: string;
  wordByWord: string;
  translation: string;
};

function CollectionShlokaCard({
  shlokaId,
  shlokaData,
  onRemove,
  onNavigate,
  hasPrevious,
  hasNext,
  currentPosition,
  totalCount,
}: {
  shlokaId: string;
  shlokaData: ShlokaData | null;
  onRemove: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentPosition: number;
  totalCount: number;
}) {
  const t = useTranslations('Collections');

  if (!shlokaData) {
    return (
      <Card className="w-full">
        <CardContent className="py-6 text-center text-muted-foreground">
          {t('shlokaNotFound')} ({shlokaId})
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-6">
        {/* Navigation within collection */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('prev')}
            disabled={!hasPrevious}
            className="size-10"
          >
            <ChevronLeft className="size-5" />
          </Button>
          
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                {t('shlokaLabel')} {shlokaId}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-destructive"
                onClick={onRemove}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              {currentPosition} / {totalCount}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('next')}
            disabled={!hasNext}
            className="size-10"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>

        {/* Sanskrit text */}
        <div className="space-y-2">
          {shlokaData.sanskrit.split('\n').map((line, i) => (
            <div
              key={i}
              className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-primary"
            >
              {line}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Word by word */}
        {shlokaData.wordByWord && (
          <>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {shlokaData.wordByWord}
            </div>
            <Separator />
          </>
        )}

        {/* Translation */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            {t('translation')}
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            {shlokaData.translation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CollectionPage({ params }: Props) {
  const { id } = use(params);
  const t = useTranslations('Collections');
  const locale = useLocale();
  const { isLoaded, removeShlokaFromCollection, getCollectionById } = useCollections();

  // Current shloka index for navigation within collection
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shlokas, setShlokas] = useState<Record<string, ShlokaData>>({});
  const [shlokasLoaded, setShlokasLoaded] = useState(false);

  const collection = getCollectionById(id);

  // Load shlokas data
  useEffect(() => {
    async function loadShlokas() {
      let data;
      switch (locale) {
        case 'en':
          data = (await import('@data/shlokas-eng.json')).default;
          break;
        case 'ru':
        default:
          data = (await import('@data/shlokas-ru.json')).default;
      }
      setShlokas(data as Record<string, ShlokaData>);
      setShlokasLoaded(true);
    }
    loadShlokas();
  }, [locale]);

  // Reset index when collection changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [id]);

  if (!isLoaded || !shlokasLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-semibold mb-2">{t('collectionNotFound')}</h2>
          <Link href={URLS.PROFILE}>
            <Button variant="outline" className="gap-2 mt-4">
              <ArrowLeft className="size-4" />
              {t('backToProfile')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = collection.isDefault
    ? t(`defaultCollections.${collection.name}`)
    : collection.name;

  // Ensure index is valid
  const validIndex = Math.min(currentIndex, Math.max(0, collection.shlokaIds.length - 1));
  const currentShlokaId = collection.shlokaIds[validIndex];
  const shlokaData = currentShlokaId ? shlokas[currentShlokaId] : null;

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && validIndex > 0) {
      setCurrentIndex(validIndex - 1);
    } else if (direction === 'next' && validIndex < collection.shlokaIds.length - 1) {
      setCurrentIndex(validIndex + 1);
    }
  };

  const handleRemove = () => {
    removeShlokaFromCollection(collection.id, currentShlokaId);
    // Adjust index if we removed the last item
    if (validIndex >= collection.shlokaIds.length - 1 && validIndex > 0) {
      setCurrentIndex(validIndex - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <Link href={URLS.PROFILE}>
          <Button variant="ghost" className="gap-2 -ml-4">
            <ArrowLeft className="size-4" />
            {t('backToProfile')}
          </Button>
        </Link>
        <span className="text-sm text-muted-foreground">
          {t('shlokaCount', { count: collection.shlokaIds.length })}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{displayName}</h1>

      {collection.shlokaIds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{t('emptyCollection')}</h3>
          <p className="text-muted-foreground">{t('emptyCollectionHint')}</p>
        </div>
      ) : (
        <CollectionShlokaCard
          shlokaId={currentShlokaId}
          shlokaData={shlokaData}
          onRemove={handleRemove}
          onNavigate={handleNavigate}
          hasPrevious={validIndex > 0}
          hasNext={validIndex < collection.shlokaIds.length - 1}
          currentPosition={validIndex + 1}
          totalCount={collection.shlokaIds.length}
        />
      )}
    </div>
  );
}
