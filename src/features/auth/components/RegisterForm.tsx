import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { Field } from '@/features/auth/components/AuthFields.tsx';
import { useRegisterMutation } from '@/features/auth/services/authApi';
import {
  setError,
  setLoading,
  setOtpData,
} from '@/features/auth/slices/authSlice';
import { Role } from '@/features/auth/types/auth.types';
import { AlertCircle, CheckCircle2, Lock, Mail, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [register] = useRegisterMutation();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [show, setShow] = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const { email, username, password, confirmPassword } = formData;
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Please enter your email address';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Please enter a valid email address';

    if (!username.trim()) newErrors.username = 'Please enter your full name';
    else if (username.trim().length < 2)
      newErrors.username = 'Full name must be at least 2 characters';

    if (!password) newErrors.password = 'Please enter a password';
    else if (password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    if (!confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    try {
      dispatch(setLoading(true));
      const payload = { ...formData, role: Role.ADMIN };
      const result = await register(payload).unwrap();

      if (result.data) {
        toast.success('Registration successful! Please verify your OTP.');
        dispatch(setOtpData({ email: payload.email, otpType: 'REGISTER' }));
        navigate('/verify-otp');
      } else {
        toast.error(result.message || 'Registration failed. Please try again.');
      }
    } catch (err: any) {
      const msg =
        err?.data?.message || 'Registration failed. Please try again.';
      dispatch(setError(msg));
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field
        id="username"
        label="Full name"
        icon={User}
        value={formData.username}
        error={errors.username}
        onChange={handleChange}
        placeholder="John Dev"
      />
      <Field
        id="email"
        label="Email"
        icon={Mail}
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
        placeholder="example@gmail.com"
        type="email"
      />
      <Field
        id="password"
        label="Password"
        icon={Lock}
        value={formData.password}
        error={errors.password}
        onChange={handleChange}
        showToggle
        show={show.password}
        onToggle={() => setShow((p) => ({ ...p, password: !p.password }))}
        placeholder="••••••••"
        type="password"
      />
      <Field
        id="confirmPassword"
        label="Confirm password"
        icon={Lock}
        value={formData.confirmPassword}
        error={errors.confirmPassword}
        onChange={handleChange}
        showToggle
        show={show.confirm}
        onToggle={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}
        placeholder="••••••••"
        type="password"
      />

      {formData.password && formData.confirmPassword && (
        <div className="flex items-center gap-2 text-xs mt-1">
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
              valid: formData.password.length >= 8,
              text: 'At least 8 characters',
            },
            {
              valid:
                /[A-Z]/.test(formData.password) &&
                /[a-z]/.test(formData.password),
              text: 'Upper and lowercase letters',
            },
            {
              valid: /\d/.test(formData.password),
              text: 'At least one number',
            },
            {
              valid: /[^a-zA-Z0-9]/.test(formData.password),
              text: 'At least one special character',
            },
          ].map(({ valid, text }, i) => (
            <li key={i} className="flex items-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  valid ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              {text}
            </li>
          ))}
        </ul>
      </div>

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
              color="#fff"
              secondaryColor="#e0e0e0"
              strokeWidth={5}
              strokeWidthSecondary={5}
              visible
            />
            <span>Signing up...</span>
          </div>
        ) : (
          'Sign up'
        )}
      </Button>

      <p className="text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-pink-400 hover:text-pink-700">
          Back to Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
