import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WifiOff, Wifi, CloudOff, Cloud } from "lucide-react";
import { usePWA } from "@/hooks/use-pwa";

interface OfflineIndicatorProps {
  className?: string;
  showWhenOnline?: boolean;
}

export function OfflineIndicator({
  className,
  showWhenOnline = false,
}: OfflineIndicatorProps) {
  const { isOnline } = usePWA();
  const [showBriefly, setShowBriefly] = React.useState(false);

  // Show briefly when coming back online
  React.useEffect(() => {
    if (isOnline && showWhenOnline) {
      setShowBriefly(true);
      const timeout = setTimeout(() => setShowBriefly(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isOnline, showWhenOnline]);

  // Don't show when online unless specified
  if (isOnline && !showBriefly) {
    return null;
  }

  return (
    <Card
      className={`fixed top-20 left-4 right-4 z-40 shadow-lg ${
        isOnline
          ? "bg-green-50 border-green-200"
          : "bg-yellow-50 border-yellow-200"
      } ${className}`}
    >
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isOnline ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-yellow-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4
              className={`text-sm font-medium ${
                isOnline ? "text-green-800" : "text-yellow-800"
              }`}
            >
              {isOnline ? "Back Online" : "Offline Mode"}
            </h4>
            <p
              className={`text-xs ${
                isOnline ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {isOnline
                ? "Data will sync automatically"
                : "Your plants are cached locally. Changes will sync when reconnected."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple status indicator for header/nav
export function NetworkStatus() {
  const { isOnline } = usePWA();

  return (
    <div className="flex items-center space-x-1">
      <div title={isOnline ? "Online" : "Offline"}>
        {isOnline ? (
          <Cloud className="w-4 h-4 text-green-500" />
        ) : (
          <CloudOff className="w-4 h-4 text-yellow-500" />
        )}
      </div>
      <span
        className={`text-xs ${isOnline ? "text-green-600" : "text-yellow-600"}`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}
