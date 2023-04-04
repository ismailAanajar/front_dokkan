import React, { useState } from 'react';

import AddressType from '@dokkan/components/Address/AddressType';
import Button from '@dokkan/components/Button';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import withAuth from '@dokkan/utils/withAuth';

function create() {
  const [type, setType] = useState<'shipping' | 'belling'>('shipping')
  return (
    <ProfileLayout page='addresses'>
      <ProfileLayout.header>
        <h2 className='mt-3 md:mt-0 text-2xl font-bold mb-3 capitalize'>Add new address</h2>
        <Button variant='link' href='/profile/addresses' className='shadow-none text-primary bg-primary_light !px-3 py-2'>back to address</Button>
      </ProfileLayout.header>
      <div className='bg-white p-3 rounded-sm shadow-sm mt-6'>
         <select className='px-4 py-2 bg-primary_light text-primary rounded-sm' name="type" title='type' onChange={(e) => setType(e.target.value as 'shipping' | 'belling')}>
          <option value="shipping">Shipping</option>
          <option value="belling">belling</option>
        </select>
        <AddressType type={type} action='create'/>
      </div>
    </ProfileLayout>
  )
}

export default withAuth(create)