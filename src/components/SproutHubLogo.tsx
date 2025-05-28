
import React from 'react';

const SproutHubLogo = ({ className = "", size = "lg" }: { className?: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-32 h-8",
    md: "w-48 h-12",
    lg: "w-64 h-16"
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} group cursor-pointer flex items-center justify-center gap-2`}>
      {/* Animated plant icon */}
      <div className={`${iconSizes[size]} relative transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Stem */}
          <path
            d="M24 48V20"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-700 group-hover:stroke-emerald-400"
          />
          
          {/* Left leaf */}
          <path
            d="M24 28C20 24 12 20 8 24C4 28 8 36 16 36C20 36 24 32 24 28Z"
            fill="#16a34a"
            className="transition-all duration-500 group-hover:fill-emerald-500 origin-bottom-right transform group-hover:scale-105 group-hover:rotate-12"
          />
          
          {/* Right leaf */}
          <path
            d="M24 20C28 16 36 12 40 16C44 20 40 28 32 28C28 28 24 24 24 20Z"
            fill="#15803d"
            className="transition-all duration-500 delay-75 group-hover:fill-emerald-600 origin-bottom-left transform group-hover:scale-105 group-hover:-rotate-12"
          />
          
          {/* Small sprouting leaf */}
          <path
            d="M24 16C26 14 30 12 32 14C34 16 32 20 28 20C26 20 24 18 24 16Z"
            fill="#22c55e"
            className="transition-all duration-500 delay-150 group-hover:fill-emerald-400 origin-bottom transform group-hover:scale-110"
          />
          
          {/* Pot base */}
          <ellipse
            cx="24"
            cy="46"
            rx="8"
            ry="2"
            fill="#8b5cf6"
            className="transition-all duration-300 group-hover:fill-violet-400"
          />
        </svg>
      </div>

      {/* Text logo */}
      <div className="flex flex-col justify-center">
        <span 
          className={`${textSizes[size]} font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-emerald-500 group-hover:to-green-400`}
        >
          SproutHub
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
          Plant Care Made Simple
        </span>
      </div>
    </div>
  );
};

export default SproutHubLogo;
