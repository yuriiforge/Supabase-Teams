import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from '../../lib/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../lib/hooks/auth/useLogin';

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (values: LoginSchema) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        window.location.href = '/dashboard';
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mb-4 w-full max-w-sm mx-auto bg-white flex flex-col gap-2"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Login
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...form.register('email')}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...form.register('password')}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {loginMutation.isError && (
        <p className="text-red-600 text-center text-sm">
          {(loginMutation.error as Error).message}
        </p>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="mt-4 cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        {loginMutation.isPending ? 'Logging in...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;
