import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

type Props<TFormValues extends FieldValues> = {
  label: string;
  name: Path<TFormValues>;
  type?: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
};

const InputForm = <TFormValues extends FieldValues>({
  label,
  name,
  type = 'text',
  register,
  error,
}: Props<TFormValues>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputForm;
