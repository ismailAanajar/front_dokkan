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

import {
  getAppConfig,
  setLoading,
} from '@dokkan/api/appSlice';
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
  const [load, setLoad] = useState(false)
  const dispatch = useAppDispatch()
  const {template, loading} = useAppSelector(state => state.app)
  if (typeof window !== "undefined") {
    themeConfig(template);
  }

  useEffect(() => {
    dispatch(setLoading())
  }, [loading])

  
  return (
    // <Provider store={store}>
    <>
      <Loader loading={loading} init/> 
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
  const {dispatch } = store
  
  await Promise.all([dispatch(getUser()), dispatch(getAppConfig())])


  return {
    
  }
})

export default wrapper.withRedux(App);