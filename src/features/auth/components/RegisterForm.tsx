import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  // Form errors
  const [errors, setErrors] = useState<{
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
  }>({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  // Validation function
  const validateForm = () => {
    const newErrors = {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.email) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter a password';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };
  // Handle input change

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
  };

  return (
    <form method="POST" onSubmit={onSubmit} className="space-y-4">
      {/* User name */}
      <div>
        <Label htmlFor="username" className="text-black">
          Full name
        </Label>
        <div className="relative mt-1">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="John Dev"
            value={formData.fullName}
            onChange={handleInputChange}
            className="pl-10 h-12 border-grey-300"
          />
        </div>
        {errors.fullName && (
          <p className="text-sm font-medium text-red-500 mt-1">
            {errors.fullName}
          </p>
        )}
      </div>
      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-black">
          Email
        </Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10 h-12 border-grey-300"
          />
        </div>
        {errors.email && (
          <p className="text-sm font-medium text-red-500 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password" className="text-black">
          Password
        </Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <Input
            id="password"
            name="password"
            type={true ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            className="pl-10 pr-10 h-12 border-grey-30"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-3 hover:bg-transparent"
            onClick={() => {}}
          >
            {true ? (
              <EyeOff className="w-4 h-4 text-black" />
            ) : (
              <Eye className="w-4 h-4 text-black" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm font-medium text-red-500 mt-1">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="password" className="text-black">
          Confirm password
        </Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <Input
            id="password"
            name="password"
            type={true ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={() => {}}
            className="pl-10 pr-10 h-12 border-grey-30"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-3 hover:bg-transparent"
            onClick={() => {}}
          >
            {true ? (
              <EyeOff className="w-4 h-4 text-black" />
            ) : (
              <Eye className="w-4 h-4 text-black" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm font-medium text-red-500 mt-1">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={false}
        className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-transform duration-200 hover:scale-[1.02]"
      >
        {false ? 'Signing up...' : 'Sign up'}
      </Button>

      {/* Back to login button */}
      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 hover:text-pink-700 p-0">
            Back to Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
