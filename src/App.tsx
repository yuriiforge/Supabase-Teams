import { RouterProvider } from 'react-router';
import { router } from './config/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/query-client';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
