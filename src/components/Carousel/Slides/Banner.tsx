import React from 'react';

import Button from '@dokkan/components/Button';

type BannerProps = {
  title: string,
  subTitle: string,
  img: string
}


function Banner({title, subTitle, img}: BannerProps) {
  return (
    <div className='relative h-[250px] md:h-auto'>
      <img className='w-full h-full md:h-auto object-cover md:object-none' src={img} alt="" />
      <div className='container absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
        <h5 className='text-lg text-secondary'>{subTitle}</h5>
        <h2 className='text-[40px] font-bold my-5'>{title}</h2>
        <Button href="#" variant='primary'>
          SHOP NOW
        </Button>
      </div>
    </div>
  )
}

export default Banner