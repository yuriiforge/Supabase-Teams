import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from '../../lib/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../lib/hooks/auth/useLogin';
import InputForm from './input-form';
import { PasswordInput } from './password-input';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

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
        window.location.href = '/home';
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

      <InputForm
        label="Email"
        name="email"
        type="email"
        register={form.register}
        error={form.formState.errors.email}
      />

      <PasswordInput
        label="Password"
        name="password"
        register={form.register}
        error={form.formState.errors.password}
      />

      <div className="text-right text-sm">
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
        >
          Forgot password?
        </Link>
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
