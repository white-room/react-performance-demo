import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { startCase } from 'lodash';

import 'src/styles/global.css';

const queryClient = new QueryClient();
const nav = [
  '/counters',
  '/counters-wrapped',
  '/filter-list',
];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4 flex justify-evenly">
        {nav.map(url => (
          <Link key={url} href={url}>
            <a className={pathname === url ? 'font-bold no-underline text-black' : ''}>{startCase(url)}</a>
          </Link>
        ))}
      </div>

      <div className="container mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}