import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import type { ToastProps } from "@/components/ui/toast";

/**
 * Props for SignInForm component.
 */
export interface SignInFormProps {
  isLoading: boolean;
  onSignIn: (
    emailOrUsername: string,
    password: string
  ) => Promise<{ error?: { message: string } } | void>;
  toast: (args: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: "default" | "destructive";
  }) => void;
}

/**
 * SignInForm component for user authentication.
 */
export const SignInForm: React.FC<SignInFormProps> = ({
  isLoading,
  onSignIn,
  toast,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } =
      (await onSignIn(formData.emailOrUsername, formData.password)) || {};
    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email or Username</Label>
        <Input
          id="signin-email"
          type="text"
          placeholder="Enter your email or username"
          value={formData.emailOrUsername}
          onChange={(e) =>
            setFormData({ ...formData, emailOrUsername: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <div className="relative">
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-plant-primary hover:bg-plant-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInForm;
