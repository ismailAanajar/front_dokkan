import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import Rating from 'react-rating';

import { openModal } from '@dokkan/api/modalSlice';
import {
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
} from '@dokkan/api/productSlice';
import { Product as ProductType } from '@dokkan/api/types';
import { getUser } from '@dokkan/api/userSlice';
import { Icons } from '@dokkan/assets/icons';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

import Button from '../Button';

type Props = ProductType & {
  isWishlist?: boolean;
}

function Product({id,image, image_url, name:productName, slug, price, rating, reviewsNumber, isWishlist}: Props) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState({
    cart: false,
    wishlist: false
  })
  const [inCart, setInCart] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)
  const {cart, wishlist, name} = useAppSelector(state => state.user.userInfo)

  useEffect(()=>{
      setInCart(cart.items.find((item:any) => item.product.id === +id) ? true : false)
      setInWishlist(wishlist.find((item:any) => item.product.id === +id) ? true : false) 
  },[cart,wishlist])

  console.log({id,inWishlist});
  

  const wishlistHandler = useCallback( (productId:number) => {
     if (!name)  {
      dispatch(openModal({comp:'auth', props:{type:'login'}}))
      return;
     } 
     setLoading(prev=>({...prev, wishlist: true}))
      dispatch(inWishlist ? removeFromWishlist({productId}) : addToWishlist({productId})).then(() => {
        setLoading(prev=>({...prev, wishlist: false}))
        dispatch(getUser())
      })
  }, [inWishlist])

  const cartHandler = useCallback( (productId:number) => {
    if (!name)  {
      dispatch(openModal({comp:'auth', props:{type:'login'}}))
      return;
     } 
     setLoading(prev=>({...prev, cart: true}))
    dispatch(inCart ? removeFromCart({productId}) : addToCart({productId, quantity:1})).then(() => {
      setLoading(prev=>({...prev, cart: false}))
      dispatch(getUser())
    })
  }, [inCart])

  return (
    <div className='bg-white shadow-md p-3 mb-4 rounded-md relative'>
      {isWishlist && <Button onClick={() => wishlistHandler(id)} loading={loading.wishlist} className='absolute rounded-none top-0 right-0 bg-primary_light  w-6 h-6 cursor-pointer !p-1'>{!loading.wishlist && <Icons.CloseMenu className='h-5  stroke-white'/>}</Button>}
      {!isWishlist && <Button title={inCart  ? 'cant added it before remove it from cart': inWishlist ? 'remove from wishlist' : 'add to wishlist'} disabled={loading.wishlist || inCart}  loading={loading.wishlist}  onClick={() => wishlistHandler(id)}  className={classNames('absolute z-10 shadow-none rounded-none top-3 right-3   cursor-pointer !p-1',{'!cursor-default': inCart})}>{inWishlist ? <Icons.FillHeart className={classNames('cursor-pointer fill-primary')}/> : <Icons.EmptyHeart className={classNames(' fill-primary',{'!fill-gray_light': inCart})}/>}</Button>}
      <div className="relative h-[170px]">
        <Link href={`/product/${id}`}><Image src={image_url || image} fill  alt='product' style={{ objectFit: 'contain' }} className='mx-auto'/></Link>
      </div>
      <Link href={`/product/${id}`} className="block mt-2 ">{productName}</Link>
      <div>
        <div>
          <div className='flex  text-primary py-2'> <Button onClick={() => {console.log('fff');dispatch(openModal({comp: 'review', props:{productId: id}}))}} variant='link' className='!pr-0 text-sm  !py-0 !px-0  outline-none'>
          {/* @ts-ignore */}
               <Rating   initialRating={rating}
                    readonly
                    emptySymbol={<Icons.EmptyStar/>}
                    fullSymbol={<Icons.FullStar/>} 
                />
                <span className='text-xs ml-1 self-baseline'>({reviewsNumber})</span>
            </Button></div>
          <div className='flex items-center justify-between gap-3'>
           <strong>${price}</strong>
           <Button onClick={() => cartHandler(id)} title={inCart ? 'remove from cart' : 'add to cart'} variant='primary' disabled={inWishlist || loading.cart} loading={loading.cart} className={classNames('rounded-sm shadow-none !py-1 !px-1 bg-white hover:bg-primary hover:[&>svg]:fill-white disabled:bg-opacity-0',{'!cursor-default !hover:bg-opacity-0': inWishlist})}>{inCart ? <Icons.Minus className='w-5 fill-primary'/> : <Icons.Plus className={classNames('w-5 fill-primary',{'!fill-gray': inWishlist})}/>}</Button>
          </div>
        </div>
        {/* <div className='flex justify-between gap-2 pt-2'>
          {!isWishlist && <Button title={inCart  ? 'cant added it before remove it from cart': inWishlist ? 'remove from wishlist' : 'add to wishlist'} disabled={loading.wishlist || inCart}  loading={loading.wishlist} onClick={()=>wishlistHandler(id)} variant='outline'  className={classNames(' p-3 shadow-none flex-grow  flex justify-center items-center cursor-pointer', {'!cursor-auto !border-primary_light ': inCart})}>{inWishlist ? <Icons.RemoveFromWishlist className='w-5 h-5  fill-primary'/> : <Icons.AddToWishlist className={classNames('w-7 h-7 fill-primary',{'!fill-primary_light': inCart })}/>}</Button>}
          <Button title={inWishlist && !isWishlist ? 'cant added it before remove it from wishlist': inCart ? 'remove from cart' : 'add to cart'} disabled={loading.cart || inWishlist}  onClick={()=>cartHandler(id)} loading={loading.cart} variant='outline' className={classNames(' p-3 shadow-none flex-grow  flex justify-center items-center cursor-pointer', {'!cursor-auto !border-primary_light ': inWishlist && !isWishlist})}>{inCart ? <Icons.RemoveFromCart className='w-7 h-7 fill-primary'/> : <Icons.AddToCart className={classNames('w-7 h-7 fill-primary',{'!fill-primary_light': inWishlist && !isWishlist})}/>}</Button>
        </div> */}
      </div>
    </div>
  )
}

export default Product