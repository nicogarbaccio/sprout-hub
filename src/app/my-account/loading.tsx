import { Skeleton } from "@/components/ui/skeleton";

export default function MyAccountLoading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Skeleton className="h-9 w-48 bg-green-100" /> {/* Title */}
          
          <div className="bg-white rounded-lg shadow-sm border border-green-800 p-6 space-y-6">
            <Skeleton className="h-7 w-36 bg-green-100" /> {/* Section title */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-20 bg-green-100" /> {/* Label */}
                <Skeleton className="h-10 w-full bg-green-100" /> {/* Input */}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20 bg-green-100" /> {/* Label */}
                <Skeleton className="h-10 w-full bg-green-100" /> {/* Input */}
              </div>
              <Skeleton className="h-10 w-full bg-green-100" /> {/* Button */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-green-800 p-6 space-y-6">
            <Skeleton className="h-7 w-36 bg-green-100" /> {/* Section title */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-20 bg-green-100" /> {/* Label */}
                <Skeleton className="h-10 w-full bg-green-100" /> {/* Input */}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20 bg-green-100" /> {/* Label */}
                <Skeleton className="h-10 w-full bg-green-100" /> {/* Input */}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20 bg-green-100" /> {/* Label */}
                <Skeleton className="h-10 w-full bg-green-100" /> {/* Input */}
              </div>
              <Skeleton className="h-10 w-full bg-green-100" /> {/* Button */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-green-800 p-6 space-y-6">
            <Skeleton className="h-7 w-36 bg-green-100" /> {/* Section title */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-green-100" /> {/* Sign Out Button */}
              <Skeleton className="h-10 w-full bg-green-100" /> {/* Delete Account Button */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 