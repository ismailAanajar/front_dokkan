import { useEffect } from 'react';

import axios from 'axios';
import parse from 'html-react-parser';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  checkResetToken,
  userActivation,
} from '@dokkan/api/authSlice';
import { openModal } from '@dokkan/api/modalSlice';
import { Product } from '@dokkan/components';
import Carousel from '@dokkan/components/Carousel';
import Banner from '@dokkan/components/Carousel/Slides/Banner';
import Category from '@dokkan/components/Carousel/Slides/Category';
import Css from '@dokkan/components/Editor/Css';
import Js from '@dokkan/components/Editor/Js';
import Offer from '@dokkan/components/Offer';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

// import { Scrollbar } from 'swiper';

type CategoryProps = {
  id: number;
  title: string;
  image: string;
  subTitle: string;
  url: string;
  width: number;
  style: any
}




export default function Home({cms}:any) {
  
  const router = useRouter()
  const query = router.query as {reset_password?: string; verify_email?: string,}
  const dispatch = useAppDispatch()
  const {checkResetTokenLoading, error} = useAppSelector(state => state.auth)
  
  useEffect(() => {
    if (query?.reset_password) {
      // @ts-ignore
      dispatch(checkResetToken(query.reset_password))
    }
  }, [])
  useEffect(() => {
    
      if (query?.reset_password) {
        if (error) {
          dispatch(openModal({text: error}))
        }
        else {
          dispatch(openModal({comp: 'auth', props:{type: 'reset'}}))
        }
      }
      if (query?.verify_email) {
         dispatch(userActivation({token: query.verify_email})).then((msg) => {
          router.replace('/', undefined, { shallow: true });
          
        })
      }
  }, [error])
  
  
  const data = {
  ComponentName:Banner,
  content: [
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
 
  }
  const bannerOptions =   {
    className: 'banner_swiper',
       slidesPerView:1,
    pagination:{ clickable: true },
    // scrollbar:{ draggable: true }
  }
  const categoriesOptions ={
          slidesPerView:1,
          spaceBetween:30,
           
          // scrollbar:{
          //   hide: false,
            
          // },
          // isScrollbar: true,
          
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
          },
          820: {
          slidesPerView: 6,
          spaceBetween: 40
        }
        } 
   } 

   const catalogOptions = {
     slidesPerView:1,
     spaceBetween:30,
     pagination: {
        el: '.custom-swiper-pagination',
        clickable: true,
        renderBullet: function (index:number, className:string) {
          return '<span class="custom-bullet ' + className + '"></span>';
        },
      },
     breakpoints: {
        // when window width is >= 320px
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 480px
        820: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is >= 640px
        1024: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        // when window width is >= 640px
        
      } 
   }
    
  const HomeCms = [
    {
      ComponentName:Category,
      area: 'categories',
      content: [
        {
          id:1,
          image: require('@dokkan/assets/images/television.png').default.src,
          title: 'television'
        },
        {
          id:2,
           image: require('@dokkan/assets/images/watch.png').default.src,
          title: 'watch'
        },
        {
          id:3,
           image: require('@dokkan/assets/images/mobile.png').default.src,
          title: 'mobile'
        },
        {
          id:4,
           image: require('@dokkan/assets/images/headphone.png').default.src,
          title: 'headphone'
        },
        {
          id:5,
           image: require('@dokkan/assets/images/game.png').default.src,
          title: 'game'
        },
        {
          id:6,
           image: require('@dokkan/assets/images/camera.png').default.src,
          title: 'camera'
        },
        {
          id:76,
           image: require('@dokkan/assets/images/audio.png').default.src,
          title: 'audio'
        },
      ]
    },
    {
      ComponentName:Offer,
      area: 'promo',
      content: [
      
      {
        id: 2,
        title: '<h2 style="font-size: 25px">Sale up to 20% Off</h2>',
        image: require('@dokkan/assets/images/offer2.jpg').default.src,
        subTitle: 'Only From $270.00',
        url: '#',
        width: 50,
        style: {
          color: '#fff',
          backgroundColor: '#333'
        }      
      },
     
      {
        id: 4,
        title: '<h2 style="font-size: 25px">Fine Smart Speaker</h2>',
        image: require('@dokkan/assets/images/offer3.jpg').default.src,
        subTitle: 'Starting at $185.00',
        url: '#',
        width: 50,
        style: {
          // textAlign: 'center',
          // backgroundColor: '#333'
        }      
      },
      //  {
      //   id: 3,
      //   title: 'title',
      //   Image: '',
      //   subTitle: '',
      //   url: '',
      //   width: 100,
      //   style: {
      //     display: 'flex',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     backgroundColor: '#333'
      //   }      
      // },
      {
        id:1,
        title: '<h2 style="font-size: 25px">The wait is on: iphone 12 max pro</h2>',
        image: require('@dokkan/assets/images/offer1.jpg').default.src,
        subTitle: 'Last call for up to 32% off!',
        url: '',
        width: 100,
        style: {
          
        }      
      },
    ]
    },
    {
      ComponentName:Product,
      area: 'catalog',
      title: 'catalog',
      content: [
        {
          id: 1,
          image: require('@dokkan/assets/images/product8.jpg').default.src,
          title: 'Xiaomi Poco M4 pro 5G',
          price: 67,
          rating: 2,
          reviewsNumber: 12
        },
        {
          id: 2,
          image: require('@dokkan/assets/images/product5.jpg').default.src,
          title: 'Xiaomi Poco M4 pro 5G',
          price: 260,
          rating: 5,
          reviewsNumber: 55
        },
        {
          id: 3,
          image: require('@dokkan/assets/images/product6.jpg').default.src,
          title: 'Xiaomi Poco M4 pro 5G',
          price: 55,
          rating: 3,
          reviewsNumber: 12
        },
        {
          id: 4,
          image: require('@dokkan/assets/images/product7.jpg').default.src,
          title: 'Xiaomi Poco M4 pro 5G',
          price: 120,
          rating: 1,
          reviewsNumber: 2
        },
        {
          id: 5,
          image: require('@dokkan/assets/images/product9.jpg').default.src,
          title: 'Xiaomi Poco M4 pro 5G',
          price: 67,
          rating: 2,
          reviewsNumber: 12
        },
        {
          id: 6,
          image: require('@dokkan/assets/images/product4.webp').default.src,
          title: 'Xiaomi Poco M4 pro 5G',
          price: 67
        },
      ]
    }
  ]

  console.log(cms);
  
 
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="My Website"/>
          <meta property="og:description" content="Check out my cool website!"/>
          <meta property="og:image" content="{dynamic-image-url}"/>
      </Head>
      <main >
        {/* <Script
          id="content-js"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: /<script\b[^>]*>([\s\S]*?)<\/script>/gm.exec(script)?.[0] || '',
          }}
        /> */}
        {/* {parse(script)} */}

        <Carousel data={data} options={bannerOptions}/>
       
        <div className='flex flex-wrap gap-3 container my-8'>
          {
            cms.map((item:any) => {
              switch (item.name) {
                case 'link_image':
                case 'text_image':
                  return <Offer {...item}/>
                case 'custom_html':
                  
                  return (
                    <div className="" style={{ width: item.width + '%' }}>
                      {parse(item.html)}
                    </div>
                  )
                case 'products carousel':
                  
                  return <div className='py-8' style={{ width: '100%' }}>
                     {item.title && <h2 className='text-2xl font-bold text-center'>{item.title}</h2>} 
                     {item.title && <p className='mb-6 text-center'>{item.sub_title}</p>} 
                    <Carousel data={{...item, content:item.products, ComponentName:Product,}} options={catalogOptions}/>  
                    </div> 
                case 'code_editor':
                  
                  return <div className="flex-grow my-10" > 
                      <Js htmlString={item.js}/>
                      {<Css cssString={item.css}/>}
                      {parse(item.html.replace(/<a\b[^>]*href="(.*?)"><\/a>/g, '<Link href="$1"></Link>'))}
                    </div>
                  break;         
                default:
                  break;
              }
            })
          }
          {/* {
            HomeCms.map(block => {
              if (block.area === 'promo') {
                return <div className='container flex flex-wrap gap-4 justify-between'>
                  {
                    // @ts-ignore
                    block.content.map((item ) => <block.ComponentName key={item.id} {...item} />)
                  }
                </div>
              }
              else if(block.area === 'catalog') {
                return <Section>
                          <Section.Heading className='mb-10'>Trending Products</Section.Heading>
                          <Carousel data={block} options={catalogOptions}/>
                        </Section>  
              }
              else if (block.area ='categories') {
                return  <Section>
                          <Section.Heading>Top categories</Section.Heading>
                          <Section.SubHeading>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</Section.SubHeading>
                          <Carousel data={block} options={categoriesOptions}/>
                        </Section>
                           
                         
              }
            })
          } */}
        </div>
      </main>
    </>
  )
}


// @ts-ignore
export const getServerSideProps = async args => {
  // const {dispatch} = store
  const resp = await axios.get('http://localhost:8000/api/v1/cms/home');
  return {
    props: {
      cms: resp.data
    }
  }
} 
