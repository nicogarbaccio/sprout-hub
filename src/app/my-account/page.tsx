'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MyAccountLoading from './loading';

interface FormErrors {
  username?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  general?: string;
}

interface FormData {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function MyAccount() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin');
    }
  }, [status, router]);

  // Update form data when session changes
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        username: session.user.name || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);

  // Show loading state while session is loading
  if (status === 'loading') {
    return <MyAccountLoading />;
  }

  // Don't render anything if not authenticated
  if (status === 'unauthenticated') {
    return null;
  }

  const validateForm = (type: 'profile' | 'password'): boolean => {
    const newErrors: FormErrors = {};

    if (type === 'profile') {
      // Only validate if the field has been changed
      if (formData.username && formData.username !== session?.user?.name) {
        if (formData.username.trim().length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        }
      }
      if (formData.email && formData.email !== session?.user?.email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
          newErrors.email = 'Invalid email address';
        }
      }
    } else if (type === 'password') {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      if (!formData.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Please confirm your new password';
      } else if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('profile')) return;

    // Check if any fields have actually changed
    const hasChanges = 
      (formData.username && formData.username !== session?.user?.name) ||
      (formData.email && formData.email !== session?.user?.email);

    if (!hasChanges) {
      setSuccessMessage('No changes to update');
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Only send fields that have changed
          ...(formData.username !== session?.user?.name && { username: formData.username }),
          ...(formData.email !== session?.user?.email && { email: formData.email }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccessMessage('Profile updated successfully');
      // Update the session to reflect changes
      await update();
    } catch (err: any) {
      setErrors({
        general: err.message || 'Failed to update profile'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('password')) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccessMessage('Password updated successfully');
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));
    } catch (err: any) {
      setErrors({
        general: err.message || 'Failed to update password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      await signOut({ callbackUrl: '/' });
    } catch (err) {
      setErrors({
        general: 'Failed to delete account'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    field: keyof FormData,
    label: string,
    type: string = 'text',
    placeholder: string = ''
  ) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      {type === 'password' ? (
        <PasswordInput
          id={field}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className={errors[field] ? 'border-red-500' : ''}
          placeholder={placeholder}
          aria-invalid={!!errors[field]}
          aria-errormessage={`${field}-error`}
          disabled={isLoading}
        />
      ) : (
        <Input
          id={field}
          type={type}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className={errors[field] ? 'border-red-500' : ''}
          placeholder={placeholder}
          aria-invalid={!!errors[field]}
          aria-errormessage={`${field}-error`}
          disabled={isLoading}
        />
      )}
      {errors[field] && (
        <p className="text-sm text-red-500" id={`${field}-error`}>
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-foreground">My Account</h1>
          
          {successMessage && (
            <div className="p-4 bg-primary/10 text-primary rounded-lg">
              {successMessage}
            </div>
          )}
          
          {errors.general && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
              {errors.general}
            </div>
          )}

          <div className="bg-background rounded-lg shadow-sm border border-border p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {renderInput('username', 'Username')}
              {renderInput('email', 'Email', 'email')}
              <Button 
                type="submit" 
                disabled={isLoading}
                variant="default"
              >
                Update Profile
              </Button>
            </form>
          </div>

          <div className="bg-background rounded-lg shadow-sm border border-border p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {renderInput('currentPassword', 'Current Password', 'password')}
              {renderInput('newPassword', 'New Password', 'password')}
              {renderInput('confirmNewPassword', 'Confirm New Password', 'password')}
              <Button 
                type="submit" 
                disabled={isLoading}
                variant="default"
              >
                Update Password
              </Button>
            </form>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                >
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-background">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete your account? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </main>
  );
} 