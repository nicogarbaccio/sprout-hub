import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
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

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
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
      console.log("AuthContext: Starting comprehensive sign out process...");

      // Step 1: Clear all possible storage locations
      const clearAllStorage = () => {
        try {
          // Clear localStorage
          const keys = Object.keys(localStorage);
          keys.forEach((key) => {
            if (
              key.includes("supabase") ||
              key.includes("auth") ||
              key.includes("sb-")
            ) {
              localStorage.removeItem(key);
              console.log(`Cleared localStorage key: ${key}`);
            }
          });

          // Clear sessionStorage
          const sessionKeys = Object.keys(sessionStorage);
          sessionKeys.forEach((key) => {
            if (
              key.includes("supabase") ||
              key.includes("auth") ||
              key.includes("sb-")
            ) {
              sessionStorage.removeItem(key);
              console.log(`Cleared sessionStorage key: ${key}`);
            }
          });

          console.log("AuthContext: Cleared all storage");
        } catch (error) {
          console.warn("AuthContext: Error clearing storage:", error);
        }
      };

      // Step 2: Clear local state first
      setSession(null);
      setUser(null);
      setLoading(false);

      // Step 3: Clear storage immediately
      clearAllStorage();

      // Step 4: Try to sign out from Supabase (but don't let it block us)
      try {
        await supabase.auth.signOut({ scope: "local" });
        console.log("AuthContext: Supabase sign out successful");
      } catch (error) {
        console.warn(
          "AuthContext: Supabase sign out failed, but continuing:",
          error
        );
        // Don't throw - we've already cleared everything locally
      }

      // Step 5: Force reload the page to ensure clean state
      setTimeout(() => {
        console.log("AuthContext: Forcing page reload for clean state");
        window.location.href = "/";
      }, 100);

      console.log("AuthContext: Sign out process completed");
    } catch (error) {
      console.error("AuthContext: Sign out completely failed:", error);

      // Even if everything fails, clear local state and reload
      setSession(null);
      setUser(null);
      setLoading(false);

      // Clear storage as fallback
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (storageError) {
        console.warn("Could not clear storage:", storageError);
      }

      // Force reload as last resort
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
