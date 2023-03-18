import Image from 'next/image';

import { Icons } from '@dokkan/assets/icons';

import Count from './Counter/Count';
import Counter from './Counter/Counter';
import Decrement from './Counter/Decrement';
import Increment from './Counter/Increment';
import { useCounterHook } from './Counter/useCounterHook';

type Props = {
  quantity: number;
  title: string;
  price: number;
  image: string
}

function Item({quantity, title, price, image}:Props) {
  const counter = useCounterHook({initialValue:quantity, min:1, max:Infinity, step:1});
  return (
    <div className='flex items-center gap-4 p-4 border-b border-gray_light'>
      <Counter {...counter} >
        <Increment><Icons.Plus /></Increment>
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