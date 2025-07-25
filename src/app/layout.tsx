import { ThemeProvider } from '@/components/theme-provider';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <header className=''>
              <nav className='flex justify-end p-4 border-b'>
                <ThemeModeToggle />
              </nav>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
