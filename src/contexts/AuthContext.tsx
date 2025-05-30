
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profileData: ProfileData;
  isLoadingProfile: boolean;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string
  ) => Promise<{ error: AuthError | { message: string } | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    avatar_url: "",
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const fetchProfile = async (userId: string) => {
    try {
      setIsLoadingProfile(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setProfileData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          username: data.username || "",
          email: data.email || "",
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error) {
      console.error("Error in fetchProfile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        // Fetch profile data when user signs in
        await fetchProfile(session.user.id);
      } else {
        // Clear profile data when user signs out
        setProfileData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          avatar_url: "",
        });
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        await fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string
  ) => {
    try {
      // First check if username already exists
      const { data: existingUser, error: checkError } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking username:", checkError);
        return {
          error: {
            message: "Error checking username availability. Please try again.",
          },
        };
      }

      if (existingUser) {
        return {
          error: {
            message:
              "Username already exists. Please choose a different username.",
          },
        };
      }

      // Check if email already exists by attempting to sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            username: username,
          },
        },
      });

      if (error) {
        // Handle specific Supabase auth errors
        if (
          error.message.includes("User already registered") ||
          error.message.includes("already been registered")
        ) {
          return {
            error: {
              message:
                "An account with this email already exists. Please sign in instead.",
            },
          };
        }
        return { error };
      }

      // If signup was successful but user is null, it means email confirmation is required
      if (data.user && !data.user.email_confirmed_at) {
        return { error: null };
      }

      return { error: null };
    } catch (err) {
      console.error("Signup error:", err);
      return {
        error: {
          message: "An unexpected error occurred. Please try again.",
        },
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    try {
      console.log("AuthContext: Starting sign out...");

      // Clear local state immediately
      setSession(null);
      setUser(null);
      setProfileData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        avatar_url: "",
      });

      // Try to sign out from Supabase
      await supabase.auth.signOut({ scope: "local" });

      console.log("AuthContext: Sign out completed");
    } catch (error) {
      console.warn(
        "AuthContext: Sign out error (but local state cleared):",
        error
      );
      // Local state is already cleared, so this is still a successful sign out from user perspective
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    profileData,
    isLoadingProfile,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
