import { useAppSelector, type RootState } from '@/core/store/store.ts';
import { Navigate } from 'react-router-dom';

export default function AuthRedirect() {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
