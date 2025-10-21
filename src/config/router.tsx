import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { MainLayout } from '../components/layout';
import { ProtectedRoute } from '../components/auth/protected-route';
import Dashboard from '../pages/dashboard';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import { GuestRoute } from '../components/auth/guest-route';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: ROUTES.HOME, element: <Dashboard /> }],
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <LoginPage /> },
          { path: ROUTES.REGISTER, element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);
