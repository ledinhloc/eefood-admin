import LoginPage from '@/pages/auth/LoginPage.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
