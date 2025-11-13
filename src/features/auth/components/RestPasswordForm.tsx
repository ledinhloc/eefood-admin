import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from '@/core/store/store';
import { Field } from '@/features/auth/components/AuthFields.tsx';
import { useResetPasswordMutation } from '@/features/auth/services/authApi';
import {
  clearOtpData,
  setError,
  setLoading,
} from '@/features/auth/slices/authSlice';
import { AlertCircle, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, otpCode, isLoading, error } = useAppSelector(
    (s: RootState) => s.auth
  );
  const [resetPassword] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors = { password: '', confirmPassword: '' };

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
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    if (!email || !otpCode) {
      toast.error('Email or OTP code is missing. Please try again.');
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await resetPassword({
        email,
        otp: otpCode,
        newPassword: formData.password,
      }).unwrap();

      toast.success(res.message || 'Password reset successful!');
      dispatch(clearOtpData());
      navigate('/login');
    } catch (err: any) {
      const msg = err?.data?.message || 'Failed to reset password';
      dispatch(setError(msg));
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white">
      <CardHeader className="space-y-3 text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Reset Your Password
        </CardTitle>
        <CardDescription className="text-base">
          Create a strong new password for your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form method="POST" onSubmit={onSubmit} className="space-y-5">
          <Field
            id="password"
            label="New Password"
            icon={Lock}
            value={formData.password}
            error={errors.password}
            onChange={handleInputChange}
            placeholder="Enter new password"
            showToggle
            show={showPassword}
            onToggle={() => setShowPassword((p) => !p)}
          />

          <Field
            id="confirmPassword"
            label="Confirm Password"
            icon={Lock}
            value={formData.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm new password"
            showToggle
            show={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((p) => !p)}
          />

          {/* Password Match Indicator */}
          {formData.confirmPassword && formData.password && (
            <div className="flex items-center gap-2 text-xs">
              {formData.password === formData.confirmPassword ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">
                    Passwords match
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-red-600 font-medium">
                    Passwords do not match
                  </span>
                </>
              )}
            </div>
          )}

          {/* Password Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs font-medium text-blue-900 mb-2">
              Password must contain:
            </p>
            <ul className="text-xs text-blue-700 space-y-1">
              {[
                {
                  label: 'At least 8 characters',
                  isValid: formData.password.length >= 8,
                },
                {
                  label: 'Upper and lowercase letters',
                  isValid:
                    /[A-Z]/.test(formData.password) &&
                    /[a-z]/.test(formData.password),
                },
                {
                  label: 'At least one number',
                  isValid: /\d/.test(formData.password),
                },
                {
                  label: 'At least one special character',
                  isValid: /[^a-zA-Z0-9]/.test(formData.password),
                },
              ].map(({ label, isValid }, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isValid ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
                <span>Resetting Password...</span>
              </div>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
