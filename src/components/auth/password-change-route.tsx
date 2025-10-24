import { useAuthStore } from '../../lib/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../../constants/routes';

const PasswordChangeProtectedRoute = () => {
  const { session, isLoading } = useAuthStore();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Outlet />;
  }

  const provider = session?.user?.app_metadata?.provider;

  if (provider && provider !== 'email') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PasswordChangeProtectedRoute;
