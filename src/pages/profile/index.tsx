import React from 'react';

import Image from 'next/image';

import { Icons } from '@dokkan/assets/icons';
import { Section } from '@dokkan/components';
import Button from '@dokkan/components/Button';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import { useAppSelector } from '@dokkan/store';
import withAuth from '@dokkan/utils/withAuth';

function profile() {
  const {name, email} = useAppSelector(state => state.user.userInfo)
  return (
    <Section>
       <ProfileLayout page='account'>
        <ProfileLayout.header>
        <h2 className='mt-3 md:mt-0 text-2xl font-bold mb-3 capitalize'>My Profile</h2>
        <Button variant='link' href='/profile/edit' className='shadow-none text-primary bg-primary_light px-3 py-2'>Edit profile</Button>
      </ProfileLayout.header>
          <div className='mt-3'>
            <div className='inline-flex mx-auto  gap-2 items-center bg-white shadow-sm p-2'>
              <Image src={require('@dokkan/assets/images/user.jpg').default.src} width={100} height={100} alt='user photo'className='rounded-full'/>
              <div>
                <strong>{name}</strong>
                <p>{email}</p>
              </div>
            </div>
            <div className="md:flex my-4 gap-3 flex-wrap">
              <div className='flex flex-col items-center bg-white shadow-sm p-2 mb-3 md:mb-0 flex-grow'>
                <span className='relative w-fit block'>
                  <span className='absolute bg-primary w-6 h-6 top-2 -right-2 rounded-full flex items-center justify-center'>1</span>
                  <Icons.TotalOrder className='w-[50px]'/>
                </span>
                <h2>Total order</h2>

              </div>
              <div className='flex flex-col items-center bg-white shadow-sm p-2 mb-3 md:mb-0 flex-grow'>
                <span className='relative w-fit block'>
                  <span className='absolute bg-primary w-6 h-6 top-2 -right-2 rounded-full flex items-center justify-center'>1</span>
                  <Icons.PendingOrder className='w-[50px]'/>
                </span>
                <h2>Pending order</h2>

              </div>
              <div className='flex flex-col items-center bg-white shadow-sm p-2 mb-3 md:mb-0 flex-grow'>
                <span className='relative w-fit block'>
                  <span className='absolute bg-primary w-6 h-6 top-2 -right-2 rounded-full flex items-center justify-center'>1</span>
                  <Icons.ProcessingOrder className='w-[50px]'/>
                </span>
                <h2>Processing order</h2>

              </div>
              <div className='flex flex-col items-center bg-white shadow-sm p-2 mb-3 md:mb-0 flex-grow'>
                <span className='relative w-fit block'>
                  <span className='absolute bg-primary w-6 h-6 top-2 -right-2 rounded-full flex items-center justify-center'>1</span>
                  <Icons.CompleteOrder className='w-[50px]'/>
                </span>
                <h2>Complete order</h2>

              </div>
            </div>
          </div>
       </ProfileLayout>
    </Section>
  )
}

export default withAuth(profile)