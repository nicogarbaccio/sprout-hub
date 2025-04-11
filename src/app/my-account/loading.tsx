import { Skeleton } from "@/components/ui/skeleton";

export default function MyAccountLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Skeleton className="h-9 w-48" /> {/* Title */}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <Skeleton className="h-7 w-36" /> {/* Section title */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
            <Skeleton className="h-10 w-full" /> {/* Button */}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <Skeleton className="h-7 w-36" /> {/* Section title */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
            <Skeleton className="h-10 w-full" /> {/* Button */}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <Skeleton className="h-7 w-36" /> {/* Section title */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" /> {/* Sign Out Button */}
            <Skeleton className="h-10 w-full" /> {/* Delete Account Button */}
          </div>
        </div>
      </div>
    </main>
  );
} 