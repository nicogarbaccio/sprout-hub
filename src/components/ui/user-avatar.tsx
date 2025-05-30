
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

interface UserAvatarProps {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  showFallback?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  firstName = "",
  lastName = "",
  avatarUrl,
  isLoading = false,
  size = "md",
  showFallback = true,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const getInitials = () => {
    const first = firstName?.trim();
    const last = lastName?.trim();
    
    if (first && last) {
      return `${first[0]}${last[0]}`.toUpperCase();
    } else if (first) {
      return first[0].toUpperCase();
    } else if (last) {
      return last[0].toUpperCase();
    }
    
    return "";
  };

  if (isLoading) {
    return <Skeleton className={`${sizeClasses[size]} rounded-full`} />;
  }

  const initials = getInitials();

  return (
    <Avatar className={sizeClasses[size]}>
      {avatarUrl && <AvatarImage src={avatarUrl} alt="Profile" />}
      <AvatarFallback className="bg-plant-primary text-white font-medium">
        {initials || (showFallback ? <User className="w-4 h-4" /> : "")}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
