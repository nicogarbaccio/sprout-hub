'use client';

import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserIcon, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
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
          <Link 
            href="/my-plants"
            className="text-white font-semibold hover:text-white/90 transition-colors whitespace-nowrap flex-shrink-0"
          >
            My Plants
          </Link>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 p-0"
                >
                  <Avatar>
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt={session.user.name ?? ''} />
                    ) : (
                      <AvatarFallback className="bg-white/10 text-white">
                        {session.user?.name?.[0]?.toUpperCase() ?? <UserIcon className="h-4 w-4" />}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <div className="font-medium">{session.user?.name}</div>
                  <div className="text-muted-foreground">{session.user?.email}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="w-full cursor-pointer">
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={toggleTheme}
                  className="cursor-pointer flex items-center"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Switch to Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Switch to Light Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="cursor-pointer text-red-500 hover:text-red-600 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signIn()}
              className="text-white hover:text-white/90 hover:bg-white/10"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
} 