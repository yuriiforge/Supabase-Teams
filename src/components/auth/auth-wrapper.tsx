interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const AuthWrapper = ({ title, description, children }: Props) => (
  <div className="flex w-full flex-col items-center justify-center px-4 ">
    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md space-y-4">
      {title && <h1 className="text-2xl font-semibold text-center">{title}</h1>}
      {description && (
        <p className="text-gray-500 text-sm text-center">{description}</p>
      )}
      <div>{children}</div>
    </div>
  </div>
);

export default AuthWrapper;
