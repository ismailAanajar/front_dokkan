import '@/dokkan/styles/globals.css';

import type { AppProps } from 'next/app';

import themeConfig from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    console.log('n,n,n,;');
    
    themeConfig({
      '--color-primary': '#1b5dd8'
    });
}
  
  return <Component {...pageProps} />
}
