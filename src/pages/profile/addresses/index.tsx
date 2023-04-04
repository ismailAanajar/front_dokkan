import React from 'react';

import { Icons } from '@dokkan/assets/icons';
import Button from '@dokkan/components/Button';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import { useAppSelector } from '@dokkan/store';
import withAuth from '@dokkan/utils/withAuth';

function index() {
  const {addresses} = useAppSelector(state => state.user.userInfo)
  return (
    <ProfileLayout page='addresses' >
      <ProfileLayout.header>
        <h2 className='mt-3 md:mt-0 text-2xl font-bold mb-3 capitalize'>My addresses</h2>
        <Button variant='link' href='/profile/addresses/create' className='shadow-none text-primary bg-primary_light px-3 py-2'>Add address</Button>
      </ProfileLayout.header>

      <div>
        {
          Object.keys(addresses).map(key => (
            <div className='mt-6'>
              <h3 className='font-bold my-3'>{key}</h3>
              {
                addresses[key as keyof typeof addresses].map(addr => (
                  <div className='flex flex-wrap justify-between items-center gap-2 bg-white p-3 rounded-sm shadow-sm mb-3'>
                    <span>{addr.email}</span>
                    <span>{addr.country + ' ' + addr.city}</span>
                    <span>{addr.phone}</span>
                    <div className='flex gap-2'>
                      <Button href={'/profile/addresses/edit/'+addr.id + '?type='+ key} className='shadow-none p-2 hover:bg-gray_light !rounded-full'><Icons.Edit/></Button>
                      <Button href='#' className='shadow-none p-2 hover:bg-gray_light !rounded-full'><Icons.Remove/></Button>
                    </div>
                  </div>
                ) )
              }
            </div>
          ))
        }
      </div>

    </ProfileLayout>
  )
}



export default withAuth(index)