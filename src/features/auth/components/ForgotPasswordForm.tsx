import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/core/store/store.ts';
import { useForgotPasswordMutation } from '@/features/auth/services/authApi.ts';
import { setError, setLoading, setOtpData } from '@/features/auth/slices/authSlice.ts';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  // Form state
  const [emailUser, setEmailUser] = useState('');
  const [emailError, setEmailError] = useState('');
  // Validation function
  const validateEmail = () => {
    if (!emailUser) {
      setEmailError('Please enter your email address');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(emailUser)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailUser(e.target.value);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const result = await forgotPassword({ email: emailUser }).unwrap();

      if (result.message) {
        toast.success(result.message);
        dispatch(setOtpData({email: emailUser, otpType: "FORGOT_PASSWORD"}));
        navigate(`/verify-otp`);
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        'Failed to send OTP code. Please try again.';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <Card className="w-full shadow-xl border-0">
      <CardHeader className="space-y-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-gray-600">
          Enter your email to receive the OTP verification code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                value={emailUser}
                onChange={handleInputChange}
                placeholder="example@email.com"
                className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {emailError && (
              <p className="text-sm font-medium text-red-500 mt-1">
                {emailError}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLoading ? 'Sending...' : 'Send OTP Code'}
          </Button>

          <div className="text-center pt-4 space-y-2">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Link>

            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
