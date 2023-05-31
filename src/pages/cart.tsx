import React, { useEffect } from 'react';

import classNames from 'classnames';
import useLocalStorage from 'use-local-storage';

import { closeModal } from '@dokkan/api/modalSlice';
import { setCheckoutStep } from '@dokkan/api/userSlice';
import Button from '@dokkan/components/Button';
import {
  CartStep,
  DetailsStep,
  PaymentStep,
} from '@dokkan/components/Cart/CheckoutSteps';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

const steps = {
  cart: CartStep,
  details: DetailsStep,
  payment: PaymentStep,
}  
function Cart() {
  const dispatch = useAppDispatch();
  const [localStep, setLocalStep] = useLocalStorage('step', 'cart')
  // const [step, setStep] = useState('');
  const step = useAppSelector(state => state.user.checkoutStep)

  const handleStepClick = (step:string) => {
    // setStep(step)
    dispatch(setCheckoutStep(step))
    setLocalStep(step)
  }
  console.log(localStep);
  
  useEffect(() => {
    // setStep(localStep || 'cart');
    dispatch(setCheckoutStep(localStep || 'cart'))
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
              <Button onClick={() =>{index <= arr.indexOf(step) && handleStepClick(key)} } className={classNames('!rounded-full capitalize  text-white', {'!bg-primary': index < arr.indexOf(step) , 'border border-primary !bg-transparent !text-primary': index === arr.indexOf(step), 'cursor-auto bg-primary_light':index > arr.indexOf(step)})}>{index + 1}.{key}</Button>
              {index !== arr.length -1   && <div className={classNames('h-1 bg-primary_light w-5', {'!bg-primary': index < arr.indexOf(step)})}></div>}
            </div>
          )
        })}
      </div>
      
      {step && <Step setStep={(step) => {dispatch(setCheckoutStep(step)); setLocalStep(step)}}/>}  
      
    </div>
   </div>
  )
}


// @ts-ignore
// export const getServerSideProps = wrapper.getServerSideProps(store => async args => {
//   const {dispatch, getState} = store
//   if (!getState().user.userInfo.name ||!getState().app.template) {
//     await Promise.all([dispatch(getUser()), dispatch(getAppConfig())])
//   }

// }) 

export default Cart