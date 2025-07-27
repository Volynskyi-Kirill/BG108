import Logo from '@/components/Logo';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';

export default function Navigation() {
  return (
    <nav className='flex justify-between items-center gap-4'>
      <Logo />
      <div className='flex items-center gap-4'>
        <LocaleSwitcher />
        <ThemeModeToggle />
      </div>
    </nav>
  );
}
