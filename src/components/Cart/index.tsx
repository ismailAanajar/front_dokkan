import useLocalStorage from 'use-local-storage';

import Button from '../Button';
import Item from './Item';

function Cart() {

  const cart = [
    {
      id:1,
      title: 'Silver High Neck Sweater',
      price: 120,
      quantity: 2,
      image: require('@dokkan/assets/images/product1.png').default.src
    },
    {
      id:2,
      title: 'Yellow Casual Sweater',
      price: 50,
      quantity: 5,
      image: require('@dokkan/assets/images/product2.png').default.src
    },
    {
      id:31,
      title: 'Denim Blue Jeans',
      price: 140,
      quantity: 1,
      image: require('@dokkan/assets/images/product3.png').default.src
    },
  ]

  // const 
  const [localStep, setLocalStep] = useLocalStorage('step', '')
  
  return (
    <div className="bg-white h-screen flex flex-col ">
      <div className='text-lg py-5  border-b border-gray_light p-4'>
        3 items
      </div>
      <div className='flex-grow'>
        {
          cart.map(item => <Item key={item.id} {...item}/> )
        }
      </div>
      <div className="p-4 flex flex-col gap-3">
        <Button href='/cart'  variant='primary'>checkout now </Button>
        <Button href='/cart'  variant='link' className='border border-primary'>view cart</Button>
      </div>
    </div>
  )
}

export default Cart