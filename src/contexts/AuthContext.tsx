import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
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
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
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
      console.log("AuthContext: Starting sign out process...");

      // Check if we have an active session
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!currentSession) {
        console.log(
          "AuthContext: No active session found, clearing local state..."
        );
        // If no session exists, just clear the local state
        setSession(null);
        setUser(null);
        return;
      }

      console.log(
        "AuthContext: Active session found, proceeding with sign out..."
      );
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("AuthContext: Sign out error:", error);

        // Handle the specific AuthSessionMissingError
        if (
          error.message?.includes("Auth session missing") ||
          error.name === "AuthSessionMissingError"
        ) {
          console.log(
            "AuthContext: Session already missing, clearing local state..."
          );
          setSession(null);
          setUser(null);
          return;
        }

        throw error;
      }

      console.log("AuthContext: Sign out completed successfully");
    } catch (error) {
      console.error("AuthContext: Sign out failed:", error);

      // Handle AuthSessionMissingError gracefully
      if (
        error.message?.includes("Auth session missing") ||
        error.name === "AuthSessionMissingError"
      ) {
        console.log(
          "AuthContext: Treating AuthSessionMissingError as successful sign out"
        );
        setSession(null);
        setUser(null);
        return;
      }

      throw error;
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
