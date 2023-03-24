import Image from 'next/image';

import { Icons } from '@dokkan/assets/icons';

import Count from './Counter/Count';
import Counter from './Counter/Counter';
import Decrement from './Counter/Decrement';
import Increment from './Counter/Increment';
import { useCounterHook } from './Counter/useCounterHook';

type Props = {
  page?: boolean;
  quantity: number;
  title: string;
  price: number;
  image: string
}

function Item({page, quantity, title, price, image}:Props) {
  const counter = useCounterHook({initialValue:quantity, min:1, max:Infinity, step:1});
  if (page) {
    return (
    <div className='md:flex items-center gap-4 px-4 py-2 bg-white rounded-md mb-3 relative shadow-sm'>
      <Image src={image}width={150} height={150} alt='product' className='mx-auto'/>
      <div className='flex-grow'>
        <h3>{title}</h3>
        <span className='text-gray text-xs'>${price}x{counter.count}</span>
        
      </div>
      <div className='flex items-center gap-3 justify-between'>
         <strong className='block text-primary'>${price*counter.count}</strong>

      <Counter {...counter} className='flex gap-2 md:mx-5 '>
          <Increment><Icons.Plus className='w-[18px]' /></Increment>
          <Count/>
          <Decrement><Icons.Minus/></Decrement>
      </Counter>
      </div>
      <div className='ml-auto cursor-pointer absolute md:static right-2 top-2 hover:bg-primary hover:text-white p-2 rounded-full'>
        <Icons.CloseMenu />
      </div>
    </div>)
  }
  return (
    <div className='flex items-center gap-4 p-4 border-b border-gray_light'>
      <Counter {...counter} >
        <Increment><Icons.Plus className='w-[18px]' /></Increment>
        <Count/>
        <Decrement><Icons.Minus/></Decrement>
      </Counter>
      <Image src={image}width={90} height={90} alt='product'/>
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