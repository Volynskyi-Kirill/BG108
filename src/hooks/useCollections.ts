'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Collection,
  getCollectionsFromStorage,
  saveCollectionsToStorage,
  generateCollectionId,
} from '@/lib/collections';

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load collections from localStorage on mount
  useEffect(() => {
    const stored = getCollectionsFromStorage();
    setCollections(stored);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever collections change
  useEffect(() => {
    if (isLoaded) {
      saveCollectionsToStorage(collections);
    }
  }, [collections, isLoaded]);

  const addCollection = useCallback((name: string, icon: Collection['icon'] = 'folder') => {
    const newCollection: Collection = {
      id: generateCollectionId(),
      name,
      icon,
      shlokaIds: [],
      isDefault: false,
      createdAt: new Date().toISOString(),
    };
    setCollections((prev) => [...prev, newCollection]);
    return newCollection;
  }, []);

  const deleteCollection = useCallback((collectionId: string) => {
    setCollections((prev) =>
      prev.filter((c) => c.id !== collectionId || c.isDefault)
    );
  }, []);

  const addShlokaToCollection = useCallback((collectionId: string, shlokaId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId && !c.shlokaIds.includes(shlokaId)) {
          return { ...c, shlokaIds: [...c.shlokaIds, shlokaId] };
        }
        return c;
      })
    );
  }, []);

  const removeShlokaFromCollection = useCallback((collectionId: string, shlokaId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId) {
          return { ...c, shlokaIds: c.shlokaIds.filter((id) => id !== shlokaId) };
        }
        return c;
      })
    );
  }, []);

  const toggleShlokaInCollection = useCallback((collectionId: string, shlokaId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId) {
          const isInCollection = c.shlokaIds.includes(shlokaId);
          return {
            ...c,
            shlokaIds: isInCollection
              ? c.shlokaIds.filter((id) => id !== shlokaId)
              : [...c.shlokaIds, shlokaId],
          };
        }
        return c;
      })
    );
  }, []);

  const isShlokaInCollection = useCallback(
    (collectionId: string, shlokaId: string): boolean => {
      const collection = collections.find((c) => c.id === collectionId);
      return collection?.shlokaIds.includes(shlokaId) ?? false;
    },
    [collections]
  );

  const getCollectionById = useCallback(
    (collectionId: string): Collection | undefined => {
      return collections.find((c) => c.id === collectionId);
    },
    [collections]
  );

  const getShlokaCollections = useCallback(
    (shlokaId: string): Collection[] => {
      return collections.filter((c) => c.shlokaIds.includes(shlokaId));
    },
    [collections]
  );

  return {
    collections,
    isLoaded,
    addCollection,
    deleteCollection,
    addShlokaToCollection,
    removeShlokaFromCollection,
    toggleShlokaInCollection,
    isShlokaInCollection,
    getCollectionById,
    getShlokaCollections,
  };
}
