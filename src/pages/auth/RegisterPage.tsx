'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AuthIllustration from '@/features/auth/components/AuthIllustration.tsx';
import RegisterForm from '@/features/auth/components/RegisterForm.tsx';
import { Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigator = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-violet-100 relative overflow-hidden p-4">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-pink-300 to-violet-300 rounded-full opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-violet-200 to-pink-300 rounded-full opacity-30 animate-blob animation-delay-2000"></div>

      <Card className="relative w-full max-w-4xl rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex bg-gradient-to-br from-pink-500 to-violet-500 items-center justify-center p-12">
          <div className="text-center">
            <AuthIllustration />
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">
              Join eeFood Today!
            </h2>
            <p className="text-white/80">Create your account to get started</p>
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className="flex flex-col items-center justify-center px-6 py-20 lg:px-18 bg-white">
          <CardHeader className="text-center mb-4">
            <CardTitle className="text-3xl font-bold text-black mb-2">
              Sign Up
            </CardTitle>
            <CardDescription className="text-black">
              Fill in the details to create your account
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full max-w-md space-y-6">
            <RegisterForm />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
