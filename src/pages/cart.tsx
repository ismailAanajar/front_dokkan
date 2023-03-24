import React, {
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';
import useLocalStorage from 'use-local-storage';

import { closeModal } from '@dokkan/api/modalSlice';
import Button from '@dokkan/components/Button';
import {
  CartStep,
  DetailsStep,
  PaymentStep,
} from '@dokkan/components/Cart/CheckoutSteps';
import { useAppDispatch } from '@dokkan/store';

const steps = {
  cart: CartStep,
  details: DetailsStep,
  payment: PaymentStep,
}  
function Cart() {
  const dispatch = useAppDispatch();
  const [localStep, setLocalStep] = useLocalStorage('step', 'cart')
  const [step, setStep] = useState('');

  const handleStepClick = (step:string) => {
    setStep(step)
    setLocalStep(step)
  }

  useEffect(() => {
    setStep(localStep);
    dispatch(closeModal())
  },[])
  
  const Step = steps[step as keyof typeof steps]
  return (
   <div className='pb-10'>
    <div className="container">
      <h1 className='py-11 text-3xl text-center'>Shopping cart</h1>

      <div className='mb-5 flex justify-center '>
        {Object.keys(steps).map((key, index, arr) => {
          return (
            <div className='flex items-center '>
              <Button onClick={() =>{index <= arr.indexOf(step) && handleStepClick(key)} } className={classNames('!rounded-full capitalize bg-primary_light text-white', {'!bg-primary': index <= arr.indexOf(step) || key === step, 'cursor-auto':index > arr.indexOf(step)})}>{index + 1}.{key}</Button>
              {index !== arr.length -1   && <div className={classNames('h-1 bg-primary_light w-5', {'!bg-primary': index < arr.indexOf(step)})}></div>}
            </div>
          )
        })}
      </div>
      
      {step && <Step setStep={(step) => {setStep(step); setLocalStep(step)}}/>}  
      
    </div>
   </div>
  )
}

export default Cart