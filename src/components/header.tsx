import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/stores/useAuthStore';
import { ROUTES } from '../constants/routes';
import { supabaseAuthService } from '../services/supabase-auth-service';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

export const Header = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabaseAuthService.logout();
    navigate(ROUTES.LOGIN);
  };

  const handleForgotPassword = () => navigate(ROUTES.FORGOT_PASSWORD);
  const handleResetPassword = () => navigate(ROUTES.RESET_PASSWORD);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to={user ? ROUTES.HOME : ROUTES.LOGIN}
          className="text-xl font-bold text-indigo-600"
        >
          Teams App
        </Link>

        <div className="flex items-center space-x-4 relative">
          {user ? (
            <>
              {/* User Icon with dropdown */}
              <div className="relative ">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center space-x-2 text-gray-700 focus:outline-none cursor-pointer"
                >
                  <FaUser className="text-3xl text-indigo-600" />
                  <span className="hidden sm:block">{user.email}</span>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-10">
                    <button
                      onClick={handleResetPassword}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={handleForgotPassword}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      Forgot Password
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
