import { Logo } from '@/components/Logo';
import { AccountMenu } from '@/components/AccountMenu';
import Link from 'next/link';
// Remove unused imports if they are no longer needed after removing AuthAvatar
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { UserIcon } from 'lucide-react';
// Remove AuthAvatar import
// import { AuthAvatar } from './AuthAvatar';

export function Navbar() {
  return (
    <nav className="bg-white border-b-2 border-green-800 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Logo className="text-green-800" />
        <div className="flex items-center gap-6">
          <Link 
            href="/browse" 
            className="text-green-800 hover:text-green-600 transition-colors"
          >
            Browse
          </Link>
          <AccountMenu />
        </div>
        {/* Remove AuthAvatar component instance */}
        {/* <AuthAvatar /> */}
      </div>
    </nav>
  );
} 