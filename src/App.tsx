import { RouterProvider } from 'react-router';
import { router } from './config/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/query-client';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './lib/stores/useAuthStore';

const LoadingScreen = () => (
  <div
    style={{
      display: 'grid',
      placeItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <p>Loading session...</p>
  </div>
);

function App() {
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
