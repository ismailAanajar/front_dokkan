import classNames from 'classnames';
import Link from 'next/link';

import Button from '../Button';

type OfferType = {
  title?: string;
  image_url?: string;
  sub_title?: string;
  link?: string;
  style?: any,
  width?: number
}

function Offer({title, image_url, sub_title, link, style, width}:OfferType) {
  const classes = classNames('container relative w-full flex-grow   block',{
    'w-full': width === 100,
    'md:w-[48%]': width === 50,
    'md:w-[31%]': width === 33,
    'h-[250px] md:h-auto p-10 ': title ||  sub_title 
  })
  if (!title && ! sub_title && link) {
    return  <div className="containe">
      <Link className={classes} href={link}>
      <img className='w-full object-cover md:object-contain block ' src={image_url} alt="" />
    </Link>
    </div>
  }
  return (
    <div className={classes} style={{...style, backgroundImage: `url(${image_url})`, backgroundPosition: 'right 40% bottom 0', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      {/* {image && <img className={classNames('w-full h-full md:h-auto object-cover md:object-contain block ', )} src={image} alt="" />} */}
      <div className={classNames({'lg:w-1/2':  image_url})}>
        {title && <h2 className='text-xl font-bold'>{title}</h2>}
        {sub_title && <p className='mb-7 mt-2'>{sub_title}</p>}
        {(title || sub_title) && <Button className='p-1 px-3'  href={link} variant='primary'>Shop now</Button>}
      </div>
    </div>
  )
}

export default Offer