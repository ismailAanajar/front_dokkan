import '@dokkan/styles/globals.css';

import {
  useEffect,
  useState,
} from 'react';

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
  useAppDispatch,
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
   const [isInitLoading, setIsInitLoading] = useState(true)

  const handleStart = () => {
    setIsLoading(true);
  };

  const handleComplete = () => {
    setIsLoading(false);
  };

  Router.events.on('routeChangeStart', handleStart);
  Router.events.on('routeChangeComplete', handleComplete);
  Router.events.on('routeChangeError', handleComplete);


  
  const name = useAppSelector(state => state.user.userInfo.name)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!name || !template) {
      setIsInitLoading(true);
       Promise.all([dispatch(getUser()), dispatch(getAppConfig({locale:'hh'}))]).then(()=> setIsInitLoading(false))
    }
  },[])

  useEffect(() => {
    if (template) {
      themeConfig(template);
    }
  },[template])

  return (
    // <Provider store={store}>
    <>
      <Loader loading={isLoading || isInitLoading } init/> 
      {!isInitLoading && <LazyMotion features={domAnimation}>
        <div className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
          <Header/>
          <div className='flex-grow'>
            <Component {...pageProps} />
           </div>   
          <Footer/>   
        <Modal/>
        </div>
      </LazyMotion>}
      </>
    // </Provider>
  )
}

// App.getInitialProps = wrapper.getInitialPageProps(store => async ({}) => {
//   const {dispatch, getState } = store
//   // if (!getState().user.userInfo.name || !getState().app.template) {
    
    
//   //   await Promise.all([dispatch(getUser()), dispatch(getAppConfig({locale:'hh'}))])
//   // }
//   return {
    
//   }
// })

export default wrapper.withRedux(App);