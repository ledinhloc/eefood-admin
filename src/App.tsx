import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage.tsx';
import LoginPage from '@/pages/auth/LoginPage.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';
import ResetPasswordPage from '@/pages/auth/RestPasswordPage.tsx';
import VerifyOtpPage from '@/pages/auth/VerifyOtpPage.tsx';
import ErrorPage from '@/pages/error/ErrorPage.tsx';
import AdminRoute from '@/utils/AdminRoute.tsx';
import AuthRedirect from '@/utils/AuthRedirect.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Layout } from './components/layout';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {/* Main Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<AdminDashboardPage />} />
          </Route>
        </Route>
        {/* Error Routes */}
        <Route path="/403" element={<ErrorPage code={403} />} />
        <Route path="/500" element={<ErrorPage code={500} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
