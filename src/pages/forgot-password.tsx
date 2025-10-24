import { supabaseAuthService } from '../services/supabase-auth-service';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { handleRequestError } from '../lib/utils/handleRequestError';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import {
  type ForgotPasswordSchema,
  forgotPasswordSchema,
} from '../lib/schemas/forgot-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthWrapper from '../components/auth/auth-wrapper';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const { error } = await supabaseAuthService.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${window.location.origin}${ROUTES.RESET_PASSWORD}`,
        }
      );

      if (error) throw error;

      toast.success('Check your email for the password reset link!');
      reset();
    } catch (err) {
      handleRequestError(err);
    }
  };

  return (
    <AuthWrapper
      title="Forgot Password"
      description="Enter your email and we'll send a password reset link."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700"
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <button
        onClick={() => navigate(ROUTES.LOGIN)}
        className="mt-4 text-indigo-600 text-sm underline block mx-auto"
      >
        Back to login
      </button>
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
