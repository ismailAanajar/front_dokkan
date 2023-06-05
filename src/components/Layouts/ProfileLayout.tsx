import {
  PropsWithChildren,
  useCallback,
} from 'react';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { logout } from '@dokkan/api/authSlice';
import { clearUser } from '@dokkan/api/userSlice';
import { Icons } from '@dokkan/assets/icons';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

import Button from '../Button';
import Section from '../Section';

const tabs = [
  {
    label:'orders',
     href: '/profile/orders',
     icon: <Icons.Order />
  },
  {
    label:'invoices',
     href: '/profile/invoices',
     icon: <Icons.Order />
  },
  {
    label:'wishlist',
    href: '/profile/wishlist',
    icon: <Icons.WhishList/>
  },
  {
    label:'addresses',
    href: '/profile/addresses',
    icon: <Icons.Address />
  }, 
  {
    label:'account',
    href: '/profile',
    icon: <Icons.User/>
  }]



function ProfileLayout({children, page, title}: PropsWithChildren<{page: string, title?: string}>) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading)
  const {replace} = useRouter()
  const logoutHandler = useCallback(()=>{
    dispatch(logout()).then(() => {
      localStorage.removeItem('token');
      replace('/')
      dispatch(clearUser())
    })
  },[])

  return (
   <Section>
     <div className='md:flex gap-3 items-start'>
      <div className='flex flex-col md:w-[25%]'>
        <div className='  flex flex-col gap-3 px-3 py-5 bg-white shadow-sm'>
          {
            tabs.map(tab => (
              <Link href={tab.href} className={classNames('!flex items-center gap-2 py-2 rounded-none px-6 hover:bg-gray_light  shadow-none text-gray text-left',{'border-l-4 border-l-primary text-primary bg-gray_light': page === tab.label})}><span>{tab.icon}</span><span>{tab.label}</span></Link>
            ))
          }
          <Button loading={loading} variant='outline' onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
      <div className='flex-grow mt-4 md:mt-0'>
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