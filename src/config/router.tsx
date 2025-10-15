import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from '../constants/routes';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.LOGIN} replace /> },
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
]);
