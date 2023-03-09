import '@dokkan/styles/globals.css';

import type { AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import { Provider } from 'react-redux';

import { Header } from '@dokkan/components';
import Footer from '@dokkan/components/Footer';

import { store } from '../store';
import themeConfig from '../theme';

const inter = Space_Grotesk({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    themeConfig({
      '--color-primary': '#ff1d52',
      '--color-secondary': '#292b2c',
    });
}
  
  return (
    <Provider store={store}>
      <main className={`${inter.variable} font-sans`}>
        <Header/>
        <Component {...pageProps} />   
        <Footer/>   
      </main>
    </Provider>
  )
}
