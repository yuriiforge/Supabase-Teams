import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterSchema,
} from '../../lib/schemas/register-schema';
import { useRegister } from '../../lib/hooks/auth/useRegister';
import InputForm from './input-form';
import { PasswordInput } from './password-input';

const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, isError, error } = useRegister();

  const onSubmit = (data: RegisterSchema) => {
    mutate(data, {
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
        Register
      </h2>

      <InputForm
        label="First Name"
        name="firstName"
        register={form.register}
        error={form.formState.errors.firstName}
      />

      <InputForm
        label="Last Name"
        name="lastName"
        register={form.register}
        error={form.formState.errors.lastName}
      />

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

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        register={form.register}
        error={form.formState.errors.confirmPassword}
      />

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
