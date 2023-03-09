// Import Swiper styles

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {
  Pagination,
  Scrollbar,
} from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

// import required modules





const Carousel = ({data}:any) => {
  const {ComponentName, slides, options} = data;
  const {isScrollbar, ...restCarouselOptions} = options;
  const child = slides.map((slide:any) => {
    return (
      <SwiperSlide key={slide.id}>
        <ComponentName {...slide}/>
      </SwiperSlide>
    )
  })
  // console.log(modules);
  const modules = [Pagination, isScrollbar ? Scrollbar : undefined ].filter(i=>i)
  
  return ( 
    <Swiper
    scrollbar= {false}
    {...restCarouselOptions}
    
    modules={modules}
    >
      {child}
    </Swiper>
   );
}
 
export default Carousel;
