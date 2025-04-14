'use client';

import { useState, useEffect } from 'react';
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
import { UserIcon, Leaf, User, LogOut } from 'lucide-react';

export function AccountMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === 'loading') {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/?signedOut=true' });
  };

  if (!session) {
    return (
      <Button
        variant="default"
        onClick={() => router.push('/auth/signin')}
        className="bg-green-800 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
      >
        Sign In
      </Button>
    );
  }

  const userInitials = session.user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-green-800 hover:bg-green-700">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-white">{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 !bg-white [&>*]:!bg-white [&>*]:!text-green-800 border border-green-800/40 !shadow-none !ring-0 !ring-offset-0 !ring-transparent !ring-offset-transparent !text-green-800" 
        align="end" 
        forceMount
      >
        <DropdownMenuItem 
          onClick={() => router.push('/my-plants')}
          className="!text-green-800 hover:!bg-green-800 hover:!text-white focus:!bg-green-800 focus:!text-white flex items-center gap-2"
        >
          <Leaf className="w-4 h-4" />
          My Plants
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push('/my-account')}
          className="!text-green-800 hover:!bg-green-800 hover:!text-white focus:!bg-green-800 focus:!text-white flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          My Account
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="!text-green-800 hover:!bg-green-800 hover:!text-white focus:!bg-green-800 focus:!text-white flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 