import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../lib/stores/useAuthStore';
import { ROUTES } from '../../constants/routes';

export const GuestRoute = () => {
  const { session } = useAuthStore();

  if (session) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
