
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
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center gap-3 group cursor-pointer`}>
      {/* Animated plant icon with enhanced effects */}
      <div className={`${iconSizes[size]} relative transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-6 transform-gpu`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Glowing background circle for depth */}
          <circle
            cx="24"
            cy="32"
            r="18"
            fill="url(#glowGradient)"
            className="opacity-20 transition-opacity duration-500 group-hover:opacity-40"
          />
          
          {/* Enhanced stem with gradient */}
          <path
            d="M24 48V20"
            stroke="url(#stemGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-700 drop-shadow-sm"
          />
          
          {/* Left leaf with enhanced animation */}
          <path
            d="M24 28C20 24 12 20 8 24C4 28 8 36 16 36C20 36 24 32 24 28Z"
            fill="url(#leafGradient1)"
            className="transition-all duration-500 origin-bottom-right transform group-hover:scale-105 group-hover:rotate-12 drop-shadow-md"
            style={{
              animation: 'float 3s ease-in-out infinite',
              animationDelay: '0s'
            }}
          />
          
          {/* Right leaf with staggered animation */}
          <path
            d="M24 20C28 16 36 12 40 16C44 20 40 28 32 28C28 28 24 24 24 20Z"
            fill="url(#leafGradient2)"
            className="transition-all duration-500 delay-75 origin-bottom-left transform group-hover:scale-105 group-hover:-rotate-12 drop-shadow-md"
            style={{
              animation: 'float 3s ease-in-out infinite',
              animationDelay: '1s'
            }}
          />
          
          {/* Small sprouting leaf with bounce effect */}
          <path
            d="M24 16C26 14 30 12 32 14C34 16 32 20 28 20C26 20 24 18 24 16Z"
            fill="url(#leafGradient3)"
            className="transition-all duration-500 delay-150 origin-bottom transform group-hover:scale-110 drop-shadow-sm"
            style={{
              animation: 'bounce 2s ease-in-out infinite',
              animationDelay: '2s'
            }}
          />
          
          {/* Enhanced pot with 3D effect */}
          <ellipse
            cx="24"
            cy="46"
            rx="8"
            ry="2"
            fill="url(#potGradient)"
            className="transition-all duration-300 drop-shadow-lg"
          />
          
          {/* Sparkle effects */}
          <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <circle cx="18" cy="22" r="1" fill="#FFD700" className="animate-pulse" />
            <circle cx="30" cy="26" r="0.8" fill="#FFD700" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="26" cy="18" r="0.6" fill="#FFD700" className="animate-pulse" style={{ animationDelay: '1s' }} />
          </g>

          {/* Gradient definitions */}
          <defs>
            <radialGradient id="glowGradient" cx="0.5" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#85B09A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4a6741" stopOpacity="0.1" />
            </radialGradient>
            
            <linearGradient id="stemGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2D4A27" />
              <stop offset="100%" stopColor="#4a6741" />
            </linearGradient>
            
            <linearGradient id="leafGradient1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#85B09A" />
              <stop offset="50%" stopColor="#4a6741" />
              <stop offset="100%" stopColor="#2D4A27" />
            </linearGradient>
            
            <linearGradient id="leafGradient2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#85B09A" />
              <stop offset="50%" stopColor="#4a6741" />
              <stop offset="100%" stopColor="#2D4A27" />
            </linearGradient>
            
            <linearGradient id="leafGradient3" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#A8D5BA" />
              <stop offset="100%" stopColor="#4a6741" />
            </linearGradient>
            
            <linearGradient id="potGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A8D5BA" />
              <stop offset="50%" stopColor="#85B09A" />
              <stop offset="100%" stopColor="#6B8E75" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Enhanced text logo with gradient and shadow */}
      <span 
        className={`${textSizes[size]} font-bold font-poppins bg-gradient-to-r from-plant-primary via-plant-secondary to-plant-primary bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105 drop-shadow-sm`}
        style={{
          backgroundSize: '200% 100%',
          animation: 'gradient-flow 3s ease-in-out infinite'
        }}
      >
        SproutHub
      </span>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(1deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-1px) scale(1.05); }
        }
        
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SproutHubLogo;
