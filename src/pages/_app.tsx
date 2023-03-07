import '@dokkan/styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import themeConfig from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    console.log('n,n,n,;');
    
    themeConfig({
      '--color-primary': '#ff1d52',
      '--color-secondary': '#3f3f3f',
    });
}
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
