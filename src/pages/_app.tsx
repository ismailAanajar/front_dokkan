import '@dokkan/styles/globals.css';

import {
  domAnimation,
  LazyMotion,
} from 'framer-motion';
import type {
  AppContext,
  AppProps,
} from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import { Provider } from 'react-redux';

import { Header } from '@dokkan/components';
import Footer from '@dokkan/components/Footer';
import Loader from '@dokkan/components/Loader/Loader';

import { store } from '../store';
import themeConfig from '../theme';

const inter = Space_Grotesk({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-inter',
})


type CustomAppProps = AppProps & {
  data: {
    loading: boolean;
    template: any
  }
}

 function App({ Component, pageProps, data }: CustomAppProps) {
  if (typeof window !== "undefined") {
    themeConfig(data.template);
  }
  
  return (
    <Provider store={store}>
      {!data.loading ? <Loader init/> : <LazyMotion features={domAnimation}>
        <main className={`${inter.variable} font-sans`}>
          <Header/>
          <Component {...pageProps} />   
          <Footer/>   
        </main>
      </LazyMotion>}
    </Provider>
  )
}

const api = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({loading: true, template: {
      '--color-primary': '#ff1d52',
      '--color-secondary': '#292b2c',
    }})
    }, 3000);
  })
}

App.getInitialProps = async (appContext: AppContext) => {
  const data = await api();

  return {
    data
  }
}

export default App;