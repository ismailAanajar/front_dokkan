import { PropsWithChildren } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import Button from '../Button';
import Section from '../Section';

const tabs = [{label:'orders', href: '/profile/orders'}, {label:'wishlist', href: '/profile/wishlist'}, {label:'addresses', href: '/profile/addresses'}, {label:'account', href: '/profile'}]

function ProfileLayout({children, page, title}: PropsWithChildren<{page: string, title?: string}>) {
  return (
   <Section>
     <div className='md:flex gap-3 items-start'>
      <div className='flex flex-col md:w-[25%]'>
        <div className='bg-white p-3 mb-3 rounded-sm shadow-sm'>
          <Image className='rounded-full mx-auto' alt='' width={200} height={200} src={require('@dokkan/assets/images/user.jpg')} />
          <div className="flex justify-between gap-3 items-center mt-2">
            <strong>1520pt</strong>
            <Button variant='link' className='shadow-none text-xs  bg-primary_light !px-2 !py-1'>logout</Button>
          </div>
        </div>
        <div className=' p-3 flex flex-col gap-3 bg-white shadow-sm'>
          {
            tabs.map(tab => (
              <Button href={tab.href} className={classNames('block py-2 px-4 bg-gray_light shadow-none text-gray',{'bg-primary text-white': page === tab.label})}>{tab.label}</Button>
            ))
          }
        </div>
      </div>
      <div className='flex-grow '>
        {title && <h2 className='mt-3 md:mt-0 text-2xl font-bold mb-3 capitalize'>{title}</h2>}
        {children}
      </div>
    </div>
   </Section>
  )
}

const Header = ({children}: PropsWithChildren) => {
  return (
    <div className='flex justify-between gap-3 items-center'>
      {children}
    </div>
  )
}

ProfileLayout.header = Header

export default ProfileLayout