import { supabaseAuthService } from '../services/supabase-auth-service';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { handleRequestError } from '../lib/utils/handleRequestError';
import { useForm } from 'react-hook-form';
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from '../lib/schemas/reset-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import AuthWrapper from '../components/auth/auth-wrapper';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const { error } = await supabaseAuthService.updateUserPassword(
        data.password
      );
      if (error) throw error;

      toast.success('Password updated successfully! Redirecting...');
      reset();
      setTimeout(() => navigate(ROUTES.LOGIN), 2000);
    } catch (err) {
      handleRequestError(err);
    }
  };

  return (
    <AuthWrapper
      title="Reset Password"
      description="Enter your new password below."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            {...register('password')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm new password"
            {...register('confirmPassword')}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update Password'}
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
