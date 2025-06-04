import { useState, useEffect } from 'react';

interface UseGracefulLoadingOptions {
  minLoadingTime?: number;
  enableStaggeredLoad?: boolean;
  staggerDelay?: number;
}

export const useGracefulLoading = (
  isActuallyLoading: boolean,
  options: UseGracefulLoadingOptions = {}
) => {
  const {
    minLoadingTime = 500,
    enableStaggeredLoad = true,
    staggerDelay = 200
  } = options;

  const [showLoading, setShowLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isActuallyLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        if (enableStaggeredLoad) {
          setTimeout(() => setShowContent(true), staggerDelay);
        } else {
          setShowContent(true);
        }
      }, minLoadingTime);

      return () => clearTimeout(timer);
    }
  }, [isActuallyLoading, minLoadingTime, enableStaggeredLoad, staggerDelay]);

  return {
    showLoading: isActuallyLoading || showLoading,
    showContent,
    isReady: !isActuallyLoading && !showLoading && showContent
  };
}; 