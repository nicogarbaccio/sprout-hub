import { Skeleton } from "@/components/ui/skeleton";

export default function SignUpLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Title Skeleton */}
        <div className="text-center">
          <Skeleton className="h-8 w-64 mx-auto" /> {/* Create Your Account text */}
        </div>

        {/* Form Fields Skeleton */}
        <div className="space-y-6">
          {/* First Name and Last Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* First Name Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* First Name Input */}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* Last Name Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Last Name Input */}
            </div>
          </div>

          {/* Username Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* Username Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Username Input */}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Email Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Email Input */}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* Password Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Password Input */}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* Confirm Password Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Confirm Password Input */}
          </div>

          {/* Submit Button */}
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Sign In Link */}
        <div className="text-center space-x-1 mt-6">
          <Skeleton className="inline-block h-4 w-32" /> {/* Already have an account? */}
          <Skeleton className="inline-block h-4 w-16" /> {/* Sign In */}
        </div>
      </div>
    </main>
  );
} 