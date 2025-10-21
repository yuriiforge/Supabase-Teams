export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-6 py-4 text-center text-gray-500">
        <p>&copy; {currentYear} Teams App. All rights reserved.</p>
        <p className="text-sm mt-1">Built by Yurii S.</p>
      </div>
    </footer>
  );
};
