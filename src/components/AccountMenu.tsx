'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserIcon } from 'lucide-react';

export function AccountMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Show loading state while session is loading
  if (status === 'loading') {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/?signedOut=true' });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
          aria-label="Account menu"
        >
          <Avatar className="h-10 w-10">
            {session?.user ? (
              <AvatarFallback className="bg-green-100 text-green-800">
                {session.user.name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            ) : (
              <AvatarFallback className="bg-gray-100">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white border-green-800 dark:bg-white dark:text-green-800"
      >
        {session?.user ? (
          <>
            <DropdownMenuItem
              onClick={() => {
                router.push('/my-plants');
                setIsOpen(false);
              }}
              className="text-green-800 hover:bg-green-800 hover:text-white focus:bg-green-800 focus:text-white dark:text-green-800 dark:hover:bg-green-800 dark:hover:text-white dark:focus:bg-green-800 dark:focus:text-white"
            >
              My Plants
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push('/my-account');
                setIsOpen(false);
              }}
              className="text-green-800 hover:bg-green-800 hover:text-white focus:bg-green-800 focus:text-white dark:text-green-800 dark:hover:bg-green-800 dark:hover:text-white dark:focus:bg-green-800 dark:focus:text-white"
            >
              My Account
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
              className="text-green-800 hover:bg-green-800 hover:text-white focus:bg-green-800 focus:text-white dark:text-green-800 dark:hover:bg-green-800 dark:hover:text-white dark:focus:bg-green-800 dark:focus:text-white"
            >
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            onClick={() => {
              router.push('/auth/signin');
              setIsOpen(false);
            }}
            className="text-green-800 hover:bg-green-800 hover:text-white focus:bg-green-800 focus:text-white dark:text-green-800 dark:hover:bg-green-800 dark:hover:text-white dark:focus:bg-green-800 dark:focus:text-white"
          >
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 