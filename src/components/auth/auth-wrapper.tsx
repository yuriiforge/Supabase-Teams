interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => (
  <div className="flex w-full min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md space-y-4">
      {children}
    </div>
  </div>
);

export default AuthCard;
