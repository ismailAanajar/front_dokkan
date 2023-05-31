import { useAppSelector } from '@dokkan/store';

import Button from '../Button';
import Item from './Item';

function Cart() {

  const cart = useAppSelector(state => state.user.userInfo.cart);
  
  return (
    <div className="bg-white h-screen flex flex-col ">
      <div className='text-lg py-5  border-b border-gray_light p-4'>
        {cart.items.length} items
      </div>
      <div className='flex-grow'>
        {
          cart.items.map(item => <Item key={item.id} quantity={item.quantity} {...item.product}/> )
        }
      </div>
      <div className="p-4 flex flex-col gap-3">
        {/* <Button href='/cart'  variant='primary' className='my-2'>checkout now </Button> */}
        <Button href='/cart'  variant='primary' className='block border border-primary !my-5'>view cart</Button>
      </div>
    </div>
  )
}

export default Cart