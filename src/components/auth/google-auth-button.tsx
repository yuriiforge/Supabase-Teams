import { FcGoogle } from 'react-icons/fc';
import { supabase } from '../../config/supabase-client';

const GoogleAuthButton = () => {
  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="cursor-pointer flex items-center justify-center w-full gap-2 rounded-lg border border-gray-300 bg-white py-2 text-gray-700 shadow-sm hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-xl" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleAuthButton;
