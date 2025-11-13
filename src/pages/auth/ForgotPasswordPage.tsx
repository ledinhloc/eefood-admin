import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm.tsx';

export default function ForgotPasswordPage() {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-red-100 flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
