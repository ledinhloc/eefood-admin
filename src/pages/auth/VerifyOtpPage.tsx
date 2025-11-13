'use client';
import { VerifyOtpForm } from '@/features/auth/components/VerifyOtpForm.tsx';

const VerifyOtpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-6">
      <VerifyOtpForm />
    </div>
  );
};

export default VerifyOtpPage;