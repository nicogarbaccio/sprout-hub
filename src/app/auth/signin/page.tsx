'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SignInLoading from './loading';

interface FormErrors {
  usernameOrEmail?: string;
  password?: string;
  general?: string;
}

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  useEffect(() => {
    setMounted(true);
    if (searchParams?.get('registered') === 'true') {
      setIsRegistered(true);
    }
  }, [searchParams]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <SignInLoading />;
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Username/Email validation
    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or email is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const result = await signIn('credentials', {
        usernameOrEmail: formData.usernameOrEmail.trim(),
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({
          general: 'Invalid username/email or password'
        });
      } else {
        router.push('/my-plants');
      }
    } catch (err) {
      setErrors({
        general: 'Something went wrong. Please try again.'
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
          disabled={isLoading}
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
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Sign In to Sprout Hub</h1>
        {isRegistered && (
          <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-4 mb-6">
            Account created successfully! Please sign in.
          </div>
        )}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
            {errors.general}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput('usernameOrEmail', 'Username or Email')}
          {renderInput('password', 'Password', 'password')}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-green-600 hover:text-green-700 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
} 