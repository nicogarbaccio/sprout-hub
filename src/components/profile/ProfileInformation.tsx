import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";

interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar_url?: string;
}

interface ProfileInformationProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  handleUpdateProfile: () => Promise<void>;
  isLoading: boolean;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({
  profileData,
  setProfileData,
  handleUpdateProfile,
  isLoading,
}) => {
  const getInitials = () => {
    return `${profileData.first_name.charAt(0)}${profileData.last_name.charAt(
      0
    )}`.toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <CardTitle>Profile Information</CardTitle>
        </div>
        <CardDescription>
          Update your personal information and avatar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profileData.avatar_url} />
            <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
          </Avatar>

          <ImageUpload
            value={profileData.avatar_url || ""}
            onChange={(url) =>
              setProfileData((prev) => ({ ...prev, avatar_url: url }))
            }
            label="Profile Picture"
            placeholder="Upload or enter avatar URL"
          />
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              value={profileData.first_name}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  first_name: e.target.value,
                }))
              }
              placeholder="Enter your first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              value={profileData.last_name}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  last_name: e.target.value,
                }))
              }
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={profileData.username}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="Enter your username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            disabled
            className="bg-muted"
          />
          <p className="text-sm text-muted-foreground/70">
            Email cannot be changed from here
          </p>
        </div>

        <Button
          onClick={handleUpdateProfile}
          disabled={isLoading}
          className="w-full bg-sprout-success hover:bg-sprout-success/90 text-white font-medium"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileInformation;
