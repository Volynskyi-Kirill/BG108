'use client';

import { AddToCollectionButton } from '@/components/collections';

interface ShlokaActionsProps {
  shlokaId: string;
}

export function ShlokaActions({ shlokaId }: ShlokaActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <AddToCollectionButton shlokaId={shlokaId} variant="button" size="default" />
    </div>
  );
}
