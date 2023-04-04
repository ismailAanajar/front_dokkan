import {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { Address } from '@dokkan/api/types';
import AddressType from '@dokkan/components/Address/AddressType';
import Button from '@dokkan/components/Button';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import { useAppSelector } from '@dokkan/store';

interface Query extends ParsedUrlQuery {
  type: 'belling' | 'shipping';
  id: string
} 

function edit() {
  const [address, setAddress] = useState<undefined | Address>(undefined)
  const addresses = useAppSelector(state => state.user.userInfo.addresses)
  const {query } = useRouter();
  const {type, id} = query as  Query;

  useEffect(() => {
    const addr = addresses[type].find(item => item.id === +id)
    setAddress(addr)
  }, [])

  
  return (
    <ProfileLayout page="addresses">
      <ProfileLayout.header>
        <h2 className='mt-3 md:mt-0 text-2xl font-bold mb-3 capitalize'>Edit address</h2>
        <Button variant='link' href='/profile/addresses' className='shadow-none text-primary bg-primary_light !px-3 py-2'>back to address</Button>
      </ProfileLayout.header>
      <div className='bg-white p-3 rounded-sm shadow-sm mt-6'>
        {  
          address && <AddressType action='update' type={type} values={Object.entries(address || {})
                      .filter(([key]) => key !== 'id' && key !== 'isPrimary')
                      .map(([key, value]) => (key === 'country' ?{ name: key, value:{value, label:value} } :{ name: key, value }))}
                    /> 
        }
      </div>
    </ProfileLayout>
  )
}

export default edit