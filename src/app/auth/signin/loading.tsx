import { Skeleton } from "@/components/ui/skeleton";

export default function SignInLoading() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        {/* Title Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-9 w-64 mx-auto" /> {/* Sign In text */}
        </div>

        {/* Form Fields Skeleton */}
        <div className="space-y-6">
          {/* Username/Email Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
          </div>

          {/* Sign In Button */}
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </main>
  );
} 