import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormErrors {
  usernameOrEmail?: string;
  password?: string;
  general?: string;
}

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  callbackUrl?: string;
}

export function SignInModal({ isOpen, onClose, callbackUrl = '/my-plants' }: SignInModalProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

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
        onClose();
        router.push(callbackUrl);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Sign In to Sprout Hub
          </DialogTitle>
        </DialogHeader>
        {errors.general && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 mb-6">
            {errors.general}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput('usernameOrEmail', 'Username or Email')}
          {renderInput('password', 'Password', 'password')}
          <Button
            type="submit"
            variant="default"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-border"></div>
          <div className="flex-grow h-px bg-border"></div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-primary hover:text-primary/90 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
} 