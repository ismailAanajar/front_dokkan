import Image from 'next/image';
import Rating from 'react-rating';

import { openModal } from '@dokkan/api/modalSlice';
import { Product as ProductType } from '@dokkan/api/types';
import { Icons } from '@dokkan/assets/icons';
import { useAppDispatch } from '@dokkan/store';

import Button from '../Button';

type Props = ProductType & {
  wishlist?: boolean;
}

function Product({id,image, title, price, rating, reviewsNumber, wishlist}: Props) {
  // const [first, setfirst] = useState(second)
  const dispatch = useAppDispatch()
  return (
    <div className='bg-white shadow-md p-3 mb-4 rounded-sm relative'>
      {wishlist && <Icons.CloseMenu className='absolute top-0 right-0 bg-primary_light text-primary p-1 w-6 h-6 cursor-pointer'/>}
      <div className="relative h-[170px]">
        <Image src={image} fill  alt='product' style={{ objectFit: 'contain' }} className='mx-auto'/>
      </div>
      <h3 className="text-center">{title}</h3>
      <div>
        <div>
          <div className='flex justify-between gap-2 text-primary py-2'><strong>${price}</strong> <strong>12pt</strong></div>
          <div className='flex items-center'>
          {/* @ts-ignore */}
            <Rating   initialRating={rating}
                    readonly
                    emptySymbol={<Icons.EmptyStar/>}
                    fullSymbol={<Icons.FullStar/>} 
            />
            <span className='text-xs ml-1 self-baseline'>({reviewsNumber})</span>
            <Button onClick={() => dispatch(openModal({comp: 'review', props:{productId: id}}))} variant='link' className='!pr-0 text-sm ml-auto !py-0 px-1 outline-none'>Rate</Button>
          </div>
        </div>
        <div className='flex justify-between gap-2 pt-2'>
          {!wishlist && <Button variant='outline'  className='p-3 shadow-none flex-grow flex justify-center items-center'><Icons.AddToWishlist className='w-5 h-5  fill-primary'/></Button>}
          <Button variant='outline' className='p-3 shadow-none flex-grow  flex justify-center items-center'><Icons.AddToCart className='w-7 h-7 fill-primary'/></Button>
        </div>
      </div>
    </div>
  )
}

export default Product