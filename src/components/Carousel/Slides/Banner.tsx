import React from 'react';

type BannerProps = {
  title: string,
  subTitle: string,
  img: string
}


function Banner({title, subTitle, img}: BannerProps) {
  return (
    <div className=''>
      <img className='w-full' src={img} alt="" />
      <div className='absolute left-1 top-1/2 -translate-y-1/2'>
        <h5 className='text-lg text-secondary'>{subTitle}</h5>
        <h2 className='text-[40px] font-bold my-5'>{title}</h2>
      </div>
    </div>
  )
}

export default Banner