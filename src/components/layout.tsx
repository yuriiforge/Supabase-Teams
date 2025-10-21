import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20 container mx-auto p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
