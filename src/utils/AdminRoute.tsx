import { useAppSelector, type RootState } from '@/core/store/store';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
  const { isAuthenticated, user } = useAppSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
}
