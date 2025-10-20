import { FcGoogle } from 'react-icons/fc';
import { useGoogleAuth } from '../../lib/hooks/auth/useGoogleAuth';

const GoogleAuthButton = () => {
  const { mutate, isPending } = useGoogleAuth();

  const handleGoogleSignIn = () => {
    mutate();
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="cursor-pointer flex items-center justify-center w-full gap-2 rounded-lg border border-gray-300 bg-white py-2 text-gray-700 shadow-sm hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-xl" />
      <span>{isPending ? 'Redirecting...' : 'Continue with Google'}</span>
    </button>
  );
};

export default GoogleAuthButton;
