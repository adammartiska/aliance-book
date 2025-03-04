import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScreenContent } from 'components/ScreenContent';
import './global.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 1, // 1 hour
    },
  },
});

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ScreenContent title="Home" path="App.tsx" />
      </QueryClientProvider>
    </>
  );
}
