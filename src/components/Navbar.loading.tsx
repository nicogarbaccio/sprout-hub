import { Logo } from '@/components/Logo';
import { Skeleton } from '@/components/ui/skeleton';

export function NavbarLoading() {
  return (
    <nav className="bg-green-600 py-4 px-6 mb-8 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center gap-6">
        <div className="flex-shrink-0">
          <Logo className="text-white" />
        </div>
        <div className="flex-1 flex items-center justify-end gap-6">
          <Skeleton className="h-[20px] w-[60px] bg-white/20" /> {/* Browse */}
          <Skeleton className="h-[20px] w-[80px] bg-white/20" /> {/* My Plants */}
          <Skeleton className="h-[32px] w-[32px] rounded-full bg-white/20" /> {/* Avatar */}
          <Skeleton className="h-[32px] w-[32px] bg-white/20" /> {/* Theme Toggle */}
        </div>
      </div>
    </nav>
  );
} 