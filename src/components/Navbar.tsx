'use client';

import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserIcon, Moon, Sun, LogOut, Settings, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Separate component for theme toggle to isolate state
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="outline"
      size="icon"
      className="border-white/20 hover:bg-white/20"
    >
      <div className="h-4 w-4">
        {theme === 'light' ? (
          <Sun className="text-white" />
        ) : (
          <Moon className="text-white" />
        )}
      </div>
    </Button>
  );
}

export function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = () => signIn(undefined, { callbackUrl: window.location.href });
  const handleSignOut = () => signOut({ callbackUrl: '/?signedOut=true' });

  const buttonBaseClass = "text-white hover:text-white/90 hover:bg-white/10 border-white/20 h-[32px] flex items-center justify-center focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 active:outline-none active:border-white/20 focus:border-white/20";

  return (
    <nav className="bg-green-600 py-4 px-6 mb-8 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center gap-6">
        <div className="flex-shrink-0">
          <Logo className="text-white" />
        </div>
        <div className="flex-1 flex items-center justify-end gap-6">
          <Link 
            href="/browse"
            className="text-white font-semibold hover:text-white/90 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Browse
          </Link>
          {session && (
            <Link 
              href="/my-plants"
              className="text-white font-semibold hover:text-white/90 transition-colors whitespace-nowrap flex-shrink-0"
            >
              My Plants
            </Link>
          )}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${buttonBaseClass} px-2 !border-white/20 !ring-0`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={session.user?.image || ''} />
                    <AvatarFallback>
                      <UserIcon className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push('/my-account')}>
                  <Settings className="mr-2 h-4 w-4" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignIn}
              className={`${buttonBaseClass} w-[72px] !border-white/20 !ring-0`}
            >
              Sign In
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
} 