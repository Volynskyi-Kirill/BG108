import Logo from '@/components/Logo';
import NavigationLinks from '@/components/NavigationLinks';

export default function Navigation() {
  return (
    <nav className='flex items-center gap-8'>
      <Logo />
      <NavigationLinks />
    </nav>
  );
}
