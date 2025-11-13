'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AuthIllustration from '@/features/auth/components/AuthIllustration.tsx';
import LoginForm from '@/features/auth/components/LoginForm.tsx';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden p-4">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-blue-300 to-blue-200 rounded-full opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-30 animate-blob animation-delay-2000"></div>

      <Card className="relative w-full max-w-4xl rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left side - Illustration */}
        <div className="hidden lg:flex bg-gradient-to-br from-orange-500 to-blue-500 items-center justify-center p-12">
          <div className="text-center">
            <AuthIllustration />
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">
              Welcome To eeFood!
            </h2>
            <p className="text-white/80">Sign in to continue</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex flex-col items-center justify-center px-6 py-20 lg:px-18 bg-white">
          <CardHeader className="text-center mb-4">
            <CardTitle className="text-3xl font-bold text-black mb-2">
              Sign In
            </CardTitle>
            <CardDescription className="text-black">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full max-w-md space-y-6">
            <LoginForm />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
