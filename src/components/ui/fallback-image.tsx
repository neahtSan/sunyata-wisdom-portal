import React, { useState, useEffect } from 'react';

interface FallbackImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  onLoadStart?: () => void;
  showSkeleton?: boolean;
  skeletonClassName?: string;
}

const DEFAULT_FALLBACK = "/images/placeholder.png";

const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = "",
  loading = "lazy",
  onLoad,
  onError,
  onLoadStart,
  showSkeleton = true,
  skeletonClassName = ""
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [previousSrc, setPreviousSrc] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Reset component state when src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
    setIsUsingFallback(false);
    setPreviousSrc(null);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setPreviousSrc(null); // Clear previous image once new one is loaded
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setPreviousSrc(null); // Clear previous image on error
    
    if (currentSrc !== fallbackSrc && !isUsingFallback) {
      // Try fallback image
      setCurrentSrc(fallbackSrc);
      setIsUsingFallback(true);
      setHasError(false);
    } else {
      // Fallback also failed or we're already using fallback
      setHasError(true);
    }
    onError?.();
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  };

  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton - only show if showSkeleton is true and no previous image to display */}
      {isLoading && showSkeleton && !previousSrc && (
        <div className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse z-10 ${skeletonClassName}`}>
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer ${skeletonClassName}`}></div>
        </div>
      )}

      {/* Error fallback */}
      {hasError ? (
        <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
          <div className="text-center text-gray-500">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs sm:text-sm">ไม่สามารถโหลดรูปภาพได้</p>
          </div>
        </div>
      ) : (
        <>
          {/* Previous image - shown while new image is loading */}
          {previousSrc && isLoading && (
            <img
              src={previousSrc}
              alt={alt}
              className={`absolute inset-0 transition-opacity duration-300 opacity-50 ${className}`}
              loading={loading}
              style={{ pointerEvents: 'none' }}
            />
          )}
          
          {/* Current image */}
          <img
            src={currentSrc}
            alt={alt}
            className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            style={{ pointerEvents: 'none' }}
          />
        </>
      )}
    </div>
  );
};

export default FallbackImage;
