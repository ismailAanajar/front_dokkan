import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { openModal } from '@dokkan/api/modalSlice';
import { Order } from '@dokkan/api/types';
import Button from '@dokkan/components/Button';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';
import { subString } from '@dokkan/utils';
import withAuth from '@dokkan/utils/withAuth';

const getStep = (status: 'pending' | 'processing' | 'failed' | 'delivered' | 'dispatched' | undefined) => {

  switch (status) {
    case 'pending':
    case 'processing':
      return 1;
    case 'dispatched':
      return 2;
    case 'delivered':
      return 3;
    default:
      return 1  
  }
}
function Order() {
  const dispatch = useAppDispatch()
  const {query, back} = useRouter()
  const order = useAppSelector<Order | undefined>(state => state.user.userInfo.orders.find((order:Order) => query.id && order.id === +query.id))
   const [steps, setStep] = useState({
        stepsItems: ["Placed", "Dispatched", "Delivered"],
        currentStep:  getStep(order?.status) 
    })
  return (
    <ProfileLayout page="orders" >
      <div className='flex items-center justify-between gap-3'>
        <h2 className='text-2xl font-bold'>My order</h2>
        <Button className='text-primary bg-primary_light shadow-none' onClick={() => back()}>Order List</Button>
      </div>
      <div className='bg-white p-3 py-10 rounded-md mt-3 shadow-sm'>
        <div className=" flex justify-center md:block  md:px-0">
            <ul aria-label="Steps" className="items-center text-gray-600 font-medium md:flex">
                {steps.stepsItems.map((item, idx) => (
                    <li aria-current={steps.currentStep == idx + 1 ? "step" : false} className="flex-1 last:flex-none flex gap-x-2 md:items-center">
                        <div className="flex items-center flex-col gap-x-2">
                            <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep >= idx + 1 ? "bg-primary border-primary_light " : "" || steps.currentStep == idx + 1 ? "border-primary" : "border-gray"}`}>

                                <span className={` ${steps.currentStep >= idx + 1 ? "hidden" : "" || steps.currentStep == idx + 1 ? "text-indigo-600" : "text-gray"}`}>
                                    {idx + 1}
                                </span>
                                {
                                    steps.currentStep >= idx + 1 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    ) : null
                                }
                            </div>
                            <hr className={`h-12 border md:hidden ${idx + 1 == steps.stepsItems.length ? "hidden" : "" || steps.currentStep > idx + 1 ? "border-primary" : " border-gray_light"}`} />
                        </div>
                        <div className="h-8 flex items-center md:h-auto">
                            <h3 className={`text-sm ${steps.currentStep >= idx + 1 ? "text-primary" : "text-gray"}`}>
                                {item}
                            </h3>
                        </div>
                        <hr className={`hidden mr-2 w-full border md:block ${idx + 1 == steps.stepsItems.length ? "!hidden" : "" || steps.currentStep > idx + 1 ? "border-primary" : "border-gray"}`} />
                    </li>
                ))}
            </ul>
        </div>
        <div className='bg-primary_light text-primary w-fit mx-auto md:mx-0 md:ml-auto mt-6 px-4 py-2 rounded-full'>
          Estimated Delivery Date <strong className=''>4th October</strong>
        </div>
      </div>
      <div className='rounded-sm  mt-4 bg-white shadow-sm'>
        <div className='bg-gray_light p-4 flex justify-between gap-3'>
          <div><span className='text-gray'>Order id:</span> <span>#{order?.number}</span></div> 
          <div><span className='text-gray'>placed on: </span> <span>{order?.created_at}</span></div>                               
        </div>
        <div>
          {
            order?.products?.map(product => (
              <div key={product.id} className='flex gap-3 items-center p-3'>
                <Image src={product.image} width={50} height={50} alt={product.title}/>
                <div className='flex-grow '>
                  <h6>{subString(product.title, 10)}</h6>
                  <span className='text-gray'>${product.price}x{product.quantity}</span>
                </div>
                <Button className='text-sm hover:bg-primary_light' variant='link' onClick={() => dispatch(openModal({comp:'review', props:{productId: product.id}}))}>write a review</Button>
              </div>
            ))
          }                                
        </div>
      </div>
      <div className="flex flex-wrap items-start  gap-3 mt-4">
        <div className='w-full md:w-[48%]'>
          {
            Object.keys(order?.address || {}).map(addr => (
              <div className='p-3 rounded-sm bg-white mb-3 shadow-sm'>
                <h3 className='font-semibold'>{addr} address</h3>
                <p>
                  {
                    Object.values({...order?.address[addr as  'belling' | 'shipping' ], id: '', isPrimary: ''} ).map(item => item + ' ')
                  }
                </p>

              </div>
            ))
            
          }
        </div>
        <div className='w-full md:w-[48%] bg-white rounded-sm shadow-sm p-3'>
          <div className='flex gap-3 justify-between'><span className='text-gray'>Total:</span><strong>${order?.total}</strong></div>
          <div className='flex gap-3 justify-between'><span className='text-gray'>payment method:</span><strong>{order?.payment_method}</strong></div>
        </div>
      </div>
    </ProfileLayout>
  )
}

export default withAuth(Order)