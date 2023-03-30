import '@dokkan/styles/globals.css';

import { useState } from 'react';

import {
  domAnimation,
  LazyMotion,
} from 'framer-motion';
import type { AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import { Router } from 'next/router';

import { getAppConfig } from '@dokkan/api/appSlice';
import { getUser } from '@dokkan/api/userSlice';
import { Header } from '@dokkan/components';
import Footer from '@dokkan/components/Footer';
import Loader from '@dokkan/components/Loader/Loader';
import Modal from '@dokkan/components/Modal';

import {
  useAppSelector,
  wrapper,
} from '../store';
import themeConfig from '../theme';

// import { store } from '../store';


const inter = Space_Grotesk({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-inter',
})


type CustomAppProps = AppProps & {
  data: any
}

 function App({ Component, pageProps  }: CustomAppProps) {
  const {template}  = useAppSelector(state => state.app)
   const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
  };

  const handleComplete = () => {
    setIsLoading(false);
  };

  Router.events.on('routeChangeStart', handleStart);
  Router.events.on('routeChangeComplete', handleComplete);
  Router.events.on('routeChangeError', handleComplete);


  if (typeof window !== "undefined") {
    themeConfig(template);
  }

  return (
    // <Provider store={store}>
    <>
      <Loader loading={isLoading} init/> 
      <LazyMotion features={domAnimation}>
        <div className={`${inter.variable} font-sans`}>
          <Header/>
          <Component {...pageProps} />   
          <Footer/>   
        <Modal/>
        </div>
      </LazyMotion>
      </>
    // </Provider>
  )
}

App.getInitialProps = wrapper.getInitialPageProps(store => async (args) => {
  const {dispatch, getState } = store
  if (!getState().user.userInfo.name || !getState().app.template) {
    await Promise.all([dispatch(getUser()), dispatch(getAppConfig())])
  }
  return {
    
  }
})

export default wrapper.withRedux(App);