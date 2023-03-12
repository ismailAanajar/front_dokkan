import { useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { checkResetToken } from '@dokkan/api/authSlice';
import { openModal } from '@dokkan/api/modalSlice';
import Carousel from '@dokkan/components/Carousel';
import Banner from '@dokkan/components/Carousel/Slides/Banner';
import Category from '@dokkan/components/Carousel/Slides/Category';
import Modal from '@dokkan/components/Modal';
import Offer from '@dokkan/components/Offer';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

// import { Scrollbar } from 'swiper';






export default function Home() {
  const {query} = useRouter()
  const dispatch = useAppDispatch()
  const {loading, error} = useAppSelector(state => state.auth)
  
  useEffect(() => {
    if (query?.reset_password) {
      dispatch(checkResetToken(query.reset_password))
    }
  }, [])
  useEffect(() => {
      if (loading) {
        if (error) {
          dispatch(openModal({text: error}))
        }
        else {
          dispatch(openModal({comp: 'reset'}))
        }
      }
  }, [error])
  
  
  const data = {
  ComponentName:Banner,
  slides: [
    {
      id:1,
      title: 'LED 75 INCH F58',
      subTitle: 'Get up to 50% Off Today',
      img: require('@dokkan/assets/images/banner_slide1.jpg').default.src
    },
    {
      id:2,
      title: 'Smart Phones',
      subTitle: '40% Off in All Products',
      img: require('@dokkan/assets/images/banner_slide2.jpg').default.src

    },
  ],
  options: {
    className: 'banner_swiper',
       slidesPerView:1,
    navigation: true,
    pagination:{ clickable: true },
    // scrollbar:{ draggable: true }
  }
  }
    const categories = {
    ComponentName:Category,
    slides: [
      {
        id:1,
        img: require('@dokkan/assets/images/tablet.webp').default.src
      },
      {
        id:2,
        img: require('@dokkan/assets/images/laptop.webp').default.src

      },
      {
        id:3,
        img: require('@dokkan/assets/images/speaker.webp').default.src

      },
      {
        id:4,
        img: require('@dokkan/assets/images/tea_maker.webp').default.src

      },
      {
        id:5,
        img: require('@dokkan/assets/images/cycle.webp').default.src

      },
    ],
    options: {
          slidesPerView:1,
          spaceBetween:30,
          scrollbar:{
            hide: false,
            
          },
          isScrollbar: true,
          
  breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }  }
  }
  const HomeCms = {
    area: 'promo',
    content: [
      {
        id:1,
        title: 'The wait is on: iphone 12 max pro',
        image: require('@dokkan/assets/images/offer1.jpg').default.src,
        subTitle: 'Last call for up to 32% off!',
        url: '',
        width: 100,
        style: {
          
        }      
      },
      {
        id: 2,
        title: '',
        image: require('@dokkan/assets/images/offer6.webp').default.src,
        subTitle: '',
        url: '#',
        width: 33,
        style: {
          backgroundColor: '#333'
        }      
      },
      {
        id: 3,
        title: 'title',
        Image: '',
        subTitle: '',
        url: '',
        width: 33,
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#333'
        }      
      },
      {
        id: 4,
        // title: 'title',
        image: require('@dokkan/assets/images/offer6.webp').default.src,
        // subTitle: '',
        url: '#',
        width: 33,
        style: {
          color: '#fff',
          textAlign: 'center',
          // backgroundColor: '#333'
        }      
      },
    ]
  }

  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Carousel data={data}/>
        <div className='categories py-9'>
          <div className="container">
            <Carousel data={categories}/>
          </div>
        </div>
        <div className='blocks py-9'>
          <div className='container flex flex-wrap gap-4 justify-between'>
            {
              HomeCms.content.map(item => <Offer key={item.id} {...item} />)
            }
          </div>
        </div>
      </main>
      <Modal/>
    </>
  )
}
