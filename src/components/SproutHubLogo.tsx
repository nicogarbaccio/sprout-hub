
import React from 'react';

const SproutHubLogo = ({ className = "", size = "lg" }: { className?: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-32 h-8",
    md: "w-48 h-12",
    lg: "w-64 h-16"
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-10 h-10"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center gap-3`}>
      {/* Simple plant icon */}
      <div className={`${iconSizes[size]} text-plant-primary`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Stem */}
          <path
            d="M12 22V10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Left leaf */}
          <path
            d="M12 14C10 12 6 10 4 12C2 14 4 18 8 18C10 18 12 16 12 14Z"
            fill="currentColor"
          />
          
          {/* Right leaf */}
          <path
            d="M12 10C14 8 18 6 20 8C22 10 20 14 16 14C14 14 12 12 12 10Z"
            fill="currentColor"
          />
          
          {/* Pot */}
          <ellipse
            cx="12"
            cy="21"
            rx="4"
            ry="1"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Text logo */}
      <span className={`${textSizes[size]} font-bold text-plant-primary`}>
        SproutHub
      </span>
    </div>
  );
};

export default SproutHubLogo;
