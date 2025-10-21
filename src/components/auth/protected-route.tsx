import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuthStore } from '../../lib/stores/useAuthStore';

export const ProtectedRoute = () => {
  const { session, isLoading } = useAuthStore();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
