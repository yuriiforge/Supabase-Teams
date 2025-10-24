import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabaseAuthService } from '../../services/supabase-auth-service';
import { ROUTES } from '../../constants/routes';
import { FaUser } from 'react-icons/fa';
import type { User } from '@supabase/supabase-js';
import { useClickOutside } from '../../lib/hooks/ui/useClickOutside';

interface Props {
  user: User;
}

const UserMenu = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabaseAuthService.logout();
    navigate(ROUTES.LOGIN);
  };

  const handleForgotPassword = () => {
    setIsOpen(false);
    navigate(ROUTES.FORGOT_PASSWORD);
  };

  const handleResetPassword = () => {
    setIsOpen(false);
    navigate(ROUTES.RESET_PASSWORD);
  };

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={dropdownRef}>
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
  );
};

export default UserMenu;
