import { RouterProvider } from 'react-router';
import { router } from './config/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/query-client';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
