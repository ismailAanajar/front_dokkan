// Import Swiper styles

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

// import required modules





const Carousel = ({data}:any) => {
  const {ComponentName, slides, options} = data;
  const {slidePerView, ...restCarouselOptions} = options;
  const child = slides.map((slide:any) => {
    return (
      <SwiperSlide key={slide.id}>
        <ComponentName {...slide}/>
      </SwiperSlide>
    )
  })
  return ( 
    <Swiper
    {...options}
    
    modules={[Pagination]}
    >
      {child}
    </Swiper>
   );
}
 
export default Carousel;
