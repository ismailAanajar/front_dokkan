import classNames from 'classnames';
import Link from 'next/link';

import Button from '../Button';

type OfferType = {
  title?: string;
  image?: string;
  subTitle?: string;
  url?: string;
  style?: any,
  width?: number
}

function Offer({title, image, subTitle, url, style, width}:OfferType) {
  const classes = classNames('relative w-full h-[250px] md:h-auto block',{
    'w-full': width === 100,
    'md:w-[48%]': width === 50,
    'md:w-[31%]': width === 33,
  })
  if (!title && ! subTitle && url) {
    return  <Link className={classes} href={url}>
      <img className='w-full object-cover md:object-contain block ' src={image} alt="" />
    </Link>
  }
  return (
    <div className={classes} style={style}>
      {image && <img className='w-full h-full md:h-auto object-cover md:object-contain block ' src={image} alt="" />}
      <div className={classNames({'absolute top-1/2 md:left-10 -translate-y-1/2 md:w-1/3':  image})}>
        {title && <h2 className='text-3xl'>{title}</h2>}
        {subTitle && <p className='my-7'>{subTitle}</p>}
        {(title || subTitle) && <Button  href={url} variant='primary'>Shop now</Button>}
      </div>
    </div>
  )
}

export default Offer