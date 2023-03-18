import classNames from 'classnames';
import parse from 'html-react-parser';
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
  const classes = classNames('relative w-full p-10   block',{
    'w-full': width === 100,
    'md:w-[48%]': width === 50,
    'md:w-[31%]': width === 33,
    'h-[250px] md:h-auto': title ||  subTitle 
  })
  if (!title && ! subTitle && url) {
    return  <Link className={classes} href={url}>
      <img className='w-full object-cover md:object-contain block ' src={image} alt="" />
    </Link>
  }
  return (
    <div className={classes} style={{...style, backgroundImage: `url(${image})`, backgroundPosition: 'right 40% bottom 0', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      {/* {image && <img className={classNames('w-full h-full md:h-auto object-cover md:object-contain block ', )} src={image} alt="" />} */}
      <div className={classNames({'lg:w-1/2':  image})}>
        {title && parse(title)}
        {subTitle && <p className='my-7'>{subTitle}</p>}
        {(title || subTitle) && <Button  href={url} variant='primary'>Shop now</Button>}
      </div>
    </div>
  )
}

export default Offer