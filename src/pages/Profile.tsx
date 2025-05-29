
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInformation from "@/components/profile/ProfileInformation";
import SecuritySettings from "@/components/profile/SecuritySettings";
import DangerZone from "@/components/profile/DangerZone";
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
