import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useAppDispatch } from '@/core/store/store.ts';
import { useVerifyOtpMutation } from '@/features/auth/services/authApi.ts';
import { setError, setLoading } from '@/features/auth/slices/authSlice.ts';
import { ArrowLeft, RotateCcw, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export const VerifyOtpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const otpType = searchParams.get('type') || 'REGISTER';
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  // Form state
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    setCountdown(60);
    setCanResend(false);
    toast.success('New OTP code has been sent!');
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return; // chỉ nhận số

    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);
    setOtpError('');

    // focus ô kế tiếp cuối cùng (nếu có)
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setOtpError('Please enter the 6-digit OTP code');
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const result = await verifyOtp({
        email,
        otpCode: otpCode,
        otpType: otpType,
      }).unwrap();
      if (result.message) {
        toast.success('Verification successful! Please log in.');
        navigate('/login');
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        'OTP verification failed. Please try again.';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Verify OTP
        </CardTitle>
        <CardDescription className="text-gray-600">
          Verification code sent to <br />
          <span className="font-medium text-gray-900">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, i) => (
              <Input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el!;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-lg font-semibold border-gray-300 focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>
          {otpError && (
            <p className="text-sm text-red-500 text-center">{otpError}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <div className="text-center">
            {canResend ? (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendOtp}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Resend OTP Code
              </Button>
            ) : (
              <p className="text-sm text-gray-600">
                Resend code in {countdown}s
              </p>
            )}
          </div>

          <div className="text-center pt-4 space-y-2">
            <Link
              to="/register"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Register
            </Link>

            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in now
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
