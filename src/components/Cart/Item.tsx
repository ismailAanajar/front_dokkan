import {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';

import { updateCart } from '@dokkan/api/productSlice';
import { getUser } from '@dokkan/api/userSlice';
import { Icons } from '@dokkan/assets/icons';
import { useAppDispatch } from '@dokkan/store';

import Count from './Counter/Count';
import Counter from './Counter/Counter';
import Decrement from './Counter/Decrement';
import Increment from './Counter/Increment';
import { useCounterHook } from './Counter/useCounterHook';

type Props = {
  page?: boolean;
  quantity: number;
  title: string;
  name?: string;
  price: number;
  image_url: string,
  id: number
}

function Item({page, quantity, name, title, price, image_url,id}:Props) {
  const [quantityChanged, setQuantityChanged] = useState(false)
  const {increment, decrement, ...counter} = useCounterHook({initialValue:quantity, min:1, max:Infinity, step:1});
  const dispatch = useAppDispatch();
  const updateCartQuantity = (type:'increment' | 'decrement')  => {
    if (type === 'increment') {
      increment()
    }
    else{
      decrement()
    }

    setQuantityChanged(true)
    
  }
  
  useEffect(() => {
    if (quantityChanged) {
      dispatch(updateCart({productId: id, quantity: counter.count})).then(() => dispatch(getUser()))
    }
  },[counter.count, quantityChanged])

  if (page) {
    return (
    <div className='md:flex items-center gap-4 px-4 py-2 bg-white rounded-md mb-3 relative shadow-sm'>
      <Image src={image_url}width={100} height={100} alt='product' className='mx-auto'/>
      <div className='flex-grow'>
        <h3>{name}</h3>
        <span className='text-gray text-xs'>${price}x{counter.count}</span>
        
      </div>
      <div className='flex items-center gap-3 justify-between'>
         <strong className='block text-primary'>${price*counter.count}</strong>

      <Counter {...counter} increment={() => updateCartQuantity('increment')} decrement={()=> updateCartQuantity('decrement')} className='flex gap-2 md:mx-5 '>
          <Increment><Icons.Plus className='w-[18px]' /></Increment>
          <Count/>
          <Decrement><Icons.Minus/></Decrement>
      </Counter>
      </div>
      <div className='ml-auto cursor-pointer absolute md:static right-2 top-2 hover:bg-primary hover:text-white p-2 rounded-full'>
        <Icons.CloseMenu className='stroke-secondary' />  
      </div>
    </div>)
  }
  return (
    <div className='flex items-center gap-4 p-4 border-b border-gray_light'>
      <Counter {...counter} increment={() => updateCartQuantity('increment')} decrement={()=> updateCartQuantity('decrement')}>
        <Increment><Icons.Plus className='w-[18px]' /></Increment>
        <Count/>
        <Decrement><Icons.Minus/></Decrement>
      </Counter>
      <Image src={image_url}width={90} height={90} alt='product'/>
      <div>
        <h3>{title}</h3>
        <span className='text-gray text-xs'>${price}x{counter.count}</span>
        <strong className='block text-primary'>${price*counter.count}</strong>
      </div>
      <div className='ml-auto cursor-pointer'>
        <Icons.CloseMenu/>
      </div>
    </div>
  )
}

export default Item