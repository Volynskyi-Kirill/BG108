import Logo from '@/components/Logo';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import NavigationLinks from '@/components/NavigationLinks';

export default function Navigation() {
  return (
    <nav className='flex justify-between items-center gap-4'>
      <Logo />
      <NavigationLinks />
      <div className='flex items-center gap-4' aria-label="Site preferences">
        <LocaleSwitcher />
        <ThemeModeToggle />
      </div>
    </nav>
  );
}
