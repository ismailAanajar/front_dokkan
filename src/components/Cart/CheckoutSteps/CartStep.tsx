import React from 'react';

import { openModal } from '@dokkan/api/modalSlice';
import Button from '@dokkan/components/Button';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

import Item from '../Item';
import StepLayout from './stepLayout';

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



function CartStep({setStep}: {setStep:(step:'details') => void}) {
  const dispatch = useAppDispatch()
  const {token} = useAppSelector(state => state.auth)

  // const {push} = useRouter()
  const action = () => { setStep('details');  console.log('helkkk')}
  const handleNextStep = () => {
    if (token) {
       setStep('details') 
    }
    else {
      dispatch(openModal({comp: 'auth', props: {type: 'login'}}))
    }
  }  

  return (
    <StepLayout>
      <StepLayout.Right>
          { 
            cart.map(item => <Item key={item.id} page {...item}/>)
          }
      </StepLayout.Right>
      <StepLayout.Left>
          <div className='flex justify-between border-b border-gray_light py-2'>
            <span>Total:</span><strong>$896</strong>
          </div>
          <Button variant='primary' className='shadow-none w-full mt-2' onClick={handleNextStep}>Checkout now</Button>
      </StepLayout.Left>
    </StepLayout>
  )
}

export default CartStep