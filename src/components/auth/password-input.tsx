// src/components/ui/PasswordInput.tsx

import { useState } from 'react';
import type {
  UseFormRegister,
  Path,
  FieldError,
  FieldValues,
} from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type PasswordInputProps<TFormValues extends FieldValues> = {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
};

export const PasswordInput = <TFormValues extends FieldValues>({
  label,
  name,
  register,
  error,
}: PasswordInputProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <input
          type={showPassword ? 'text' : 'password'}
          {...register(name)}
          className="w-full rounded-lg border border-gray-300 p-2 pr-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
