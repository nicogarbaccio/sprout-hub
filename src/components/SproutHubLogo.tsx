import React from "react";

const SproutHubLogo = ({
  className = "",
  size = "lg",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "w-32 h-8",
    md: "w-48 h-12",
    lg: "w-64 h-16",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${className} flex items-center justify-center gap-3`}
    >
      {/* Minimalistic Monstera Leaf Outline */}
      <div className={`${iconSizes[size]} text-green-600 dark:text-green-400`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Monstera leaf outline */}
          <path
            d="M12 2C15.5 2 18.5 4.5 20 8C21 10.5 20.5 13.5 18.5 16C16.5 18.5 13.5 20 10.5 19.5C7.5 19 5 16.5 4.5 13.5C4 10.5 5.5 7.5 8 5.5C9.5 4 10.7 2.8 12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Monstera fenestrations (holes) */}
          <path
            d="M9 8C9.5 8.5 10.5 9 11 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          <path
            d="M13.5 7.5C14 8 14.5 8.5 15 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          <path
            d="M8.5 12C9 12.5 9.5 13 10 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          <path
            d="M15 12C15.5 12.5 16 13 16.5 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          <path
            d="M11 15.5C11.5 16 12 16.5 12.5 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          {/* Central vein */}
          <path
            d="M12 4L12 18"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          
          {/* Side veins */}
          <path
            d="M12 6L9.5 9"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          
          <path
            d="M12 6L14.5 9"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          
          <path
            d="M12 10L8.5 13"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          
          <path
            d="M12 10L15.5 13"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          
          <path
            d="M12 14L10 17"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          
          <path
            d="M12 14L14 17"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text logo */}
      <span
        className={`${textSizes[size]} font-bold text-plant-primary dark:text-green-600 group-hover:text-plant-primary/90 dark:group-hover:text-green-400 transition-colors duration-200`}
      >
        SproutHub
      </span>
    </div>
  );
};

export default SproutHubLogo;
