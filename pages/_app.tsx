import { AppProps } from "next/app";

import 'src/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto">
      <Component {...pageProps} />
    </div>
  );
}