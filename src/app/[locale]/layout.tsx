import { ThemeProvider } from '@/components/theme-provider';
import { routing } from '@/i18n/routing';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import './../globals.css';
import Container from '@/components/Container';
import Navigation from '@/components/Navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <header className='border-b'>
              <Container>
                <div className='flex justify-between items-center'>
                  <Navigation />
                  <div
                    className='flex items-center gap-4'
                    aria-label='Site preferences'
                  >
                    <LocaleSwitcher aria-label='Change language' />
                    <ThemeModeToggle aria-label='Toggle theme' />
                  </div>
                </div>
              </Container>
            </header>
            <main className=''>
              <Container>{children}</Container>
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
