import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage.tsx';
import LoginPage from '@/pages/auth/LoginPage.tsx';
import ProfilePage from '@/pages/auth/ProfilePage.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';
import ResetPasswordPage from '@/pages/auth/RestPasswordPage.tsx';
import VerifyOtpPage from '@/pages/auth/VerifyOtpPage.tsx';
import CommentPage from '@/pages/comments/CommentPage.tsx';
import ErrorPage from '@/pages/error/ErrorPage.tsx';
import NotificationPage from '@/pages/notifications/NotificationPage.tsx';
import PostPage from '@/pages/posts/PostPage.tsx';
import RecipePage from '@/pages/recipes/RecipePage.tsx';
import UserPage from '@/pages/users/UserPage.tsx';
import AdminRoute from '@/utils/AdminRoute.tsx';
import AuthRedirect from '@/utils/AuthRedirect.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Layout } from './components/layout';
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage';

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
        <Route path="/profile" element={<ProfilePage />} />
        {/* Main Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/posts" element={<PostPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/recipes" element={<RecipePage />} />
            <Route path="/comments" element={<CommentPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
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
