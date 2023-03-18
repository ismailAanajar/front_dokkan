import '@dokkan/styles/globals.css';

import {
  useEffect,
  useState,
} from 'react';

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
  const [load, setLoad] = useState(false)
  if (typeof window !== "undefined") {
    themeConfig(data.template);
  }

  useEffect(() => {
    if(data.loading) setLoad(true)
  }, [])
  
  
  return (
    <Provider store={store}>
      <Loader loading={!load} init/> 
      <LazyMotion features={domAnimation}>
        <main className={`${inter.variable} font-sans`}>
          <Header/>
          <Component {...pageProps} />   
          <Footer/>   
        </main>
      </LazyMotion>
    </Provider>
  )
}

const api = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({loading: true, template: {
      '--color-primary': '#ff1d52',
      '--color-primary-light': '#fa6d8e',
      '--color-secondary': '#292b2c',
    }})
    }, 8000);
  })
}

App.getInitialProps = async (appContext: AppContext) => {
  const data = await api();

  return {
    data
  }
}

export default App;