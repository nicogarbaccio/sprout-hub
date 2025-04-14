'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Sprout } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (session) {
      router.push('/my-plants');
    } else {
      router.push('/');
    }
  }, [router, session]);

  const LogoContent = () => (
    <>
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <Sprout className="w-5 h-5" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">Sprout Hub</h1>
    </>
  );

  if (!mounted) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <LogoContent />
      </div>
    );
  }

  return (
    <button 
      onClick={handleLogoClick}
      className={`flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer ${className}`}
    >
      <LogoContent />
    </button>
  );
} 