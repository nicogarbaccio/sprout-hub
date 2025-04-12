'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { PasswordInput } from '@/components/ui/password-input';
import SignUpLoading from './loading';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignUp() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <SignUpLoading />;
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username.trim())) {
      newErrors.username = 'Username can only contain letters, numbers, underscores and hyphens';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Sign in automatically after successful registration
      const signInResult = await signIn('credentials', {
        usernameOrEmail: formData.email.trim(),
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error('Failed to sign in after registration');
      }

      router.push('/my-plants');
    } catch (err: any) {
      setErrors({
        general: err.message || 'An error occurred during registration'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    field: keyof typeof formData,
    label: string,
    type: string = 'text'
  ) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      {type === 'password' ? (
        <PasswordInput
          id={field}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className={errors[field] ? 'border-red-500' : ''}
          aria-invalid={!!errors[field]}
          aria-errormessage={`${field}-error`}
        />
      ) : (
        <Input
          id={field}
          type={type}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className={errors[field] ? 'border-red-500' : ''}
          aria-invalid={!!errors[field]}
          aria-errormessage={`${field}-error`}
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
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Account</h1>
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
            {errors.general}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {renderInput('firstName', 'First Name')}
            {renderInput('lastName', 'Last Name')}
          </div>
          {renderInput('username', 'Username')}
          {renderInput('email', 'Email', 'email')}
          {renderInput('password', 'Password', 'password')}
          {renderInput('confirmPassword', 'Confirm Password', 'password')}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-green-600 hover:text-green-700 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
} 