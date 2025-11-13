import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/core/store/store.ts';
import { useRegisterMutation } from '@/features/auth/services/authApi.ts';
import { setError, setLoading } from '@/features/auth/slices/authSlice.ts';
import { Role } from '@/features/auth/types/auth.types.ts';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [register] = useRegisterMutation();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Toggle hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form errors
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.email) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Please enter your full name';
    } else if (formData.username.trim().length < 2) {
      newErrors.username = 'Full name must be at least 2 characters';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
      dispatch(setError('Please fix the errors in the form.'));
      toast.error('Please fix the errors in the form.');
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: Role.ADMIN,
      };

      const result = await register(data).unwrap();
      if (result.data) {
        toast.success('Registration successful! Please verify your OTP.');
        navigate(
          `/verify-otp?email=${encodeURIComponent(formData.email)}&otpType=REGISTER`
        );
      } else {
        toast.error(result.message || 'Registration failed. Please try again.');
      }
    } catch (err: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        'Registration failed. Please try again.';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form method="POST" onSubmit={onSubmit} className="space-y-4">
      {/* Full name */}
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
            value={formData.username}
            onChange={handleInputChange}
            className="pl-10 h-12 border-grey-300"
          />
        </div>
        {errors.username && (
          <p className="text-sm font-medium text-red-500 mt-1">
            {errors.username}
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
            type={showPassword ? 'text' : 'password'}
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
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
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
        <Label htmlFor="confirmPassword" className="text-black">
          Confirm password
        </Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="pl-10 pr-10 h-12 border-grey-30"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-3 hover:bg-transparent"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
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
        disabled={isLoading}
        className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-transform duration-200 hover:scale-[1.02]"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Oval
              height={20}
              width={20}
              color="#ffffff"
              secondaryColor="#e0e0e0"
              strokeWidth={5}
              strokeWidthSecondary={5}
              visible={true}
              ariaLabel="loading"
            />
            <span>Signing up...</span>
          </div>
        ) : (
          'Sign up'
        )}
      </Button>

      {/* Back to login */}
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
