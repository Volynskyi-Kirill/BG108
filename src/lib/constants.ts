export const URLS = {
  HOME: '/',
  ABOUT: '/about',
  PROFILE: '/profile',
  SHLOKA: (shlokaNumber: string) => `/shloka/${shlokaNumber}`,
  COLLECTION: (collectionId: string) => `/collections/${collectionId}`,
};
