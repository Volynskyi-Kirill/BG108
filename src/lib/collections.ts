// Types and constants for poem collections

export interface Collection {
  id: string;
  name: string;
  icon: 'heart' | 'book' | 'check' | 'folder';
  shlokaIds: string[];
  isDefault: boolean;
  createdAt: string;
}

export const STORAGE_KEY = 'bg108_collections';

export const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: 'favorites',
    name: 'favorites',
    icon: 'heart',
    shlokaIds: [],
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'learning',
    name: 'learning',
    icon: 'book',
    shlokaIds: [],
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'learned',
    name: 'learned',
    icon: 'check',
    shlokaIds: [],
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
];

export function getCollectionsFromStorage(): Collection[] {
  if (typeof window === 'undefined') return DEFAULT_COLLECTIONS;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      saveCollectionsToStorage(DEFAULT_COLLECTIONS);
      return DEFAULT_COLLECTIONS;
    }
    return JSON.parse(stored);
  } catch {
    return DEFAULT_COLLECTIONS;
  }
}

export function saveCollectionsToStorage(collections: Collection[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
  } catch (error) {
    console.error('Failed to save collections:', error);
  }
}

export function generateCollectionId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
