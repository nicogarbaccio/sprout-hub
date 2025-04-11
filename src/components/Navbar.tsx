import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-green-600 py-4 px-6 mb-8 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center gap-6">
        <Link href="/" className="flex-shrink-0">
          <Logo className="text-white" />
        </Link>
        <div className="flex-1 flex items-center justify-end gap-6">
          <Link 
            href="/browse"
            className="text-white font-semibold hover:text-white/90 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Browse
          </Link>
          <Link 
            href="/my-plants"
            className="text-white font-semibold hover:text-white/90 transition-colors whitespace-nowrap flex-shrink-0"
          >
            My Plants
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 p-0"
            asChild
          >
            <Link href="/account">
              <Avatar>
                <AvatarFallback className="bg-white/10 text-white">
                  <UserIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">My Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
} 