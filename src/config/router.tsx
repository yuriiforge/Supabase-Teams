import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { MainLayout } from '../components/layout';
import { ProtectedRoute } from '../components/auth/protected-route';
import Dashboard from '../pages/dashboard';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import { GuestRoute } from '../components/auth/guest-route';
import ForgotPasswordPage from '../pages/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password';
import PasswordChangeProtectedRoute from '../components/auth/password-change-route';

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
    element: <PasswordChangeProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
          { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);
