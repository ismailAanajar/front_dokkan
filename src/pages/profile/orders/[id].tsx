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

function Order() {
  const dispatch = useAppDispatch()
  const {query, back} = useRouter()
  const order = useAppSelector<Order | undefined>(state => state.user.userInfo.orders.find((order:Order) => query.id && order.id === +query.id))
   const [steps, setStep] = useState({
        stepsItems: ["Placed", "Dispatched", "Delivered"],
        currentStep: 2
    })
  return (
    <ProfileLayout page="orders" >
      <div className='flex items-center justify-between gap-3'>
        <h2 className='text-2xl font-bold'>#{order?.number}</h2>
        <Button className='text-primary bg-primary_light shadow-none'>Order List</Button>
      </div>
      <div className='bg-white p-3 py-10 rounded-md mt-3 shadow-sm'>
        <div className=" mx-auto px-4 md:px-0">
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
                            <hr className={`h-12 border md:hidden ${idx + 1 == steps.stepsItems.length ? "hidden" : "" || steps.currentStep > idx + 1 ? "border-primary_light" : ""}`} />
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
        <div className='bg-primary_light text-primary w-fit ml-auto mt-6 px-4 py-2 rounded-full'>
          Estimated Delivery Date <strong className=''>4th October</strong>
        </div>
      </div>
      <div className='rounded-sm  mt-4 bg-white'>
        <div className='bg-gray_light p-4 flex justify-between gap-3'>
          <div><span className='text-gray'>Order id:</span> <strong>#{order?.number}</strong></div> 
          <div><span className='text-gray'>placed on: </span> <strong>{order?.created_at}</strong></div>                               
        </div>
        <div>
          {
            order?.products?.map(product => (
              <div key={product.id} className='flex gap-3'>
                <Image src={product.image} width={50} height={50} alt={product.title}/>
                <h5 className='flex-grow'>{product.title}</h5>
                <Button variant='link' onClick={() => dispatch(openModal({comp:'review', props:{productId: product.id}}))}>add review</Button>
              </div>
            ))
          }                                
        </div>
      </div>
    </ProfileLayout>
  )
}

export default Order