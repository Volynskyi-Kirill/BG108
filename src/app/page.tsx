import { DEFAULT_LOCALES } from '@/i18n/routing';
import { redirect } from 'next/navigation';

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect(DEFAULT_LOCALES);
}
