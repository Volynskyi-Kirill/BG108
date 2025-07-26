import { defineRouting } from 'next-intl/routing';

export const LOCALES = {
  EN: 'en',
  RU: 'ru',
};

export const DEFAULT_LOCALES = LOCALES.RU;

export const routing = defineRouting({
  locales: [LOCALES.EN, LOCALES.RU],
  defaultLocale: DEFAULT_LOCALES,
});
