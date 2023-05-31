import { Story } from '@storybook/react';

import Product from '../Product';
import Carousel, { CarouselProps } from './';
import Banner from './Slides/Banner';

const MainData = {
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

  const productData =  {
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

  const bannerOptions =   {
    className: 'banner_swiper',
       slidesPerView:1,
    pagination:{ clickable: true },
    // scrollbar:{ draggable: true }
  }
export default {
  title: 'carousel',
  component: Carousel,
  // decorators: [
  //   (Story:any) => (
  //     <Provider store={makeStore}>
  //       <div  className='flex justify-center items-center'>
  //       {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
  //       <Story />
  //     </div>
  //     </Provider>
  //   ),
  // ],
}


const Template:Story<CarouselProps> = (args) => <Carousel {...args}/>

export const Main = Template.bind({});

Main.args = {
  //@ts-ignore
  data: MainData,
  options: bannerOptions
}
// export const ProductCarousel = Template.bind({});

// ProductCarousel.args = {
//   data: productData,
//   options: bannerOptions
// }