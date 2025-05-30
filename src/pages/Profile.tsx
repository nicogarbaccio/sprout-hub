import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInformation from "@/components/profile/ProfileInformation";
import SecuritySettings from "@/components/profile/SecuritySettings";
import DangerZone from "@/components/profile/DangerZone";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const {
    profileData,
    setProfileData,
    passwordData,
    setPasswordData,
    isLoading,
    isLoadingProfile,
    handleUpdateProfile,
    handleChangePassword,
    handleDeleteAccount,
  } = useProfile();

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <Navigation />
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-plant-primary/10 to-plant-secondary/10 p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header Skeleton */}
            <Card>
              <CardHeader className="text-center">
                <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                <Skeleton className="h-8 w-48 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Information Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                  <Skeleton className="h-10 w-32" />
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Security Settings Skeleton */}
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-56" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-36" />
                  </CardContent>
                </Card>

                {/* Danger Zone Skeleton */}
                <Card className="border-red-200">
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-64" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-32" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
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
          <ProfileHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProfileInformation
              profileData={profileData}
              setProfileData={setProfileData}
              handleUpdateProfile={handleUpdateProfile}
              isLoading={isLoading}
            />

            <div className="space-y-6">
              <SecuritySettings
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                handleChangePassword={handleChangePassword}
                isLoading={isLoading}
              />

              <DangerZone
                handleDeleteAccount={handleDeleteAccount}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
