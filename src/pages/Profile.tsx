
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
import { User, Mail, Key, Camera, Trash2 } from "lucide-react";
import { PasswordInput } from "@/components/auth/PasswordInput";
import ImageUpload from "@/components/ui/image-upload";

interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar_url?: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    avatar_url: "",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setProfileData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        username: data.username || "",
        email: data.email || user.email || "",
        avatar_url: (data as any).avatar_url || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Check if username is unique (if changed)
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", profileData.username)
        .neq("id", user.id)
        .single();

      if (existingUser) {
        toast({
          title: "Error",
          description: "Username already exists. Please choose a different one.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          username: profileData.username,
          avatar_url: profileData.avatar_url,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast({
        title: "Success",
        description: "Password updated successfully",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setIsLoading(true);
    try {
      // Delete user plants first
      await supabase
        .from("user_plants")
        .delete()
        .eq("user_id", user?.id);

      // Delete profile
      await supabase
        .from("profiles")
        .delete()
        .eq("id", user?.id);

      // Sign out and redirect
      await signOut();
      navigate("/");
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted",
      });
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    return `${profileData.first_name.charAt(0)}${profileData.last_name.charAt(0)}`.toUpperCase();
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-plant-primary/10 to-plant-secondary/10 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-plant-text mb-2">Profile Settings</h1>
            <p className="text-plant-text/70">Manage your account information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
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
                    onChange={(url) => setProfileData(prev => ({ ...prev, avatar_url: url }))}
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
                      onChange={(e) => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={profileData.last_name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
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
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-gray-500">Email cannot be changed from here</p>
                </div>

                <Button 
                  onClick={handleUpdateProfile} 
                  disabled={isLoading}
                  className="w-full bg-plant-primary hover:bg-plant-primary/90"
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <CardTitle>Change Password</CardTitle>
                  </div>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <PasswordInput
                    id="new_password"
                    label="New Password"
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(value) => setPasswordData(prev => ({ ...prev, newPassword: value }))}
                  />

                  <PasswordInput
                    id="confirm_password"
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={(value) => setPasswordData(prev => ({ ...prev, confirmPassword: value }))}
                  />

                  <Button 
                    onClick={handleChangePassword} 
                    disabled={isLoading || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="w-full"
                  >
                    {isLoading ? "Updating..." : "Change Password"}
                  </Button>
                </CardContent>
              </Card>

              {/* Account Management */}
              <Card className="border-red-200">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </div>
                  <CardDescription>
                    Irreversible actions that affect your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    variant="destructive"
                    className="w-full"
                  >
                    {isLoading ? "Deleting..." : "Delete Account"}
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    This will permanently delete your account and all associated data.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
