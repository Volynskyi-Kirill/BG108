'use client';

import { useTranslations } from 'next-intl';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollectionsList } from '@/components/collections';

export default function ProfilePage() {
  const t = useTranslations('Profile');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <User className="size-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{t('title')}</CardTitle>
              <p className="text-muted-foreground">{t('description')}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('myCollections')}</h2>
        <CollectionsList />
      </div>
    </div>
  );
}
