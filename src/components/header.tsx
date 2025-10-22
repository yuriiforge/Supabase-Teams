import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/stores/useAuthStore';
import { ROUTES } from '../constants/routes';
import { supabaseAuthService } from '../services/supabase-auth-service';

export const Header = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabaseAuthService.logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to={user ? ROUTES.HOME : ROUTES.LOGIN}
          className="text-xl font-bold text-indigo-600"
        >
          Teams App
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="text-gray-600 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
