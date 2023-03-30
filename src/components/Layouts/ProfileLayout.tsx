import { PropsWithChildren } from 'react';

import classNames from 'classnames';

import Button from '../Button';
import Section from '../Section';

const tabs = [{label:'orders', href: '/profile/orders'}, {label:'wishlist', href: '/profile/wishlist'}, {label:'addresses', href: '/profile/addresses'}, {label:'account', href: '/profile'}]

function ProfileLayout({children, page, title}: PropsWithChildren<{page: string, title?: string}>) {
  return (
   <Section>
     <div className='md:flex gap-3 items-start'>
      <div className='md:w-[25%] p-3 flex flex-col gap-3 bg-white shadow-sm'>
        {
          tabs.map(tab => (
            <Button href={tab.href} className={classNames('bg-gray_light shadow-none text-gray',{'bg-primary text-white': page === tab.label})}>{tab.label}</Button>
          ))
        }
      </div>
      <div className='flex-grow '>
        {title && <h2 className='mt-3 md:mt-0 text-2xl font-bold mb-3 capitalize'>{title}</h2>}
        {children}
      </div>
    </div>
   </Section>
  )
}

export default ProfileLayout