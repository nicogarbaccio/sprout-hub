import { Input } from '@/components/ui/input';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="bg-green-600 py-4 px-6 mb-8 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center gap-6">
        <div className="flex-shrink-0">
          <Logo className="text-white" />
        </div>
        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="max-w-md w-full">
            <Input
              type="search"
              placeholder="Search plants..."
              className="bg-white/90 border-transparent focus-visible:ring-white w-full"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <Link 
            href="/my-plants"
            className="text-white font-semibold hover:text-white/90 transition-colors whitespace-nowrap flex-shrink-0"
          >
            My Plants
          </Link>
        </div>
      </div>
    </nav>
  );
} 