// Import Swiper styles

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import {
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

// import required modules





const Carousel = ({data, options}:any) => {
  const {ComponentName, content} = data;
  const {isScrollbar,  ...restCarouselOptions} = options;
  const child = content.map((slide:any) => {
    return (
      <SwiperSlide key={slide.id}>
        <ComponentName {...slide}/>
      </SwiperSlide>
    )
  })
  // console.log(modules);
  const modules = [Pagination, options.navigation ? Navigation : undefined, isScrollbar ? Scrollbar : undefined ].filter(i=>i)
  
  return ( 
    <Swiper
    scrollbar= {false}
    {...restCarouselOptions}
    
    modules={modules}
    >
      {child}
      <div className="custom-swiper-pagination"></div>
    </Swiper>
   );
}
 
export default Carousel;
