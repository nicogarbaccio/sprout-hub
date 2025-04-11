import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 p-0"
              >
                <Avatar>
                  <AvatarFallback className="bg-white/10 text-white">
                    <UserIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/account" className="w-full cursor-pointer">
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
} 