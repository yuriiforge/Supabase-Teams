import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterSchema,
} from '../../lib/schemas/register-schema';
import { useRegister } from '../../lib/hooks/auth/useRegister';

const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending, isError, error } = useRegister();

  const onSubmit = (data: RegisterSchema) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mb-4 w-full max-w-sm mx-auto bg-white flex flex-col gap-2"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Register
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          {...form.register('firstName')}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        {form.formState.errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          {...form.register('lastName')}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        {form.formState.errors.lastName && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.lastName.message}
          </p>
        )}
      </div>

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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          {...form.register('confirmPassword')}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      {isError && (
        <p className="text-red-600 text-center text-sm">{error.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        {isPending ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default RegisterForm;
