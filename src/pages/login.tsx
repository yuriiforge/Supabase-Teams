import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import LoginForm from '../components/auth/login-form';
import AuthCard from '../components/auth/auth-wrapper';
import GoogleAuthButton from '../components/auth/google-auth-button';

const LoginPage = () => {
  return (
    <AuthCard>
      <LoginForm />

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <GoogleAuthButton />

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Register
        </Link>
      </p>
    </AuthCard>
  );
};

export default LoginPage;
