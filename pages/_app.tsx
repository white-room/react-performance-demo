import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';

import 'src/styles/global.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}