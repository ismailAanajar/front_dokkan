import Link from 'next/link';

import { Order } from '@dokkan/api/types';
import { Icons } from '@dokkan/assets/icons';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import { useAppSelector } from '@dokkan/store';
import withAuth from '@dokkan/utils/withAuth';

function Orders() {
  const orders = useAppSelector<Order[]>(state => state.user.userInfo.orders)
  return (
    
       <ProfileLayout page='orders' title='my orders'>
          <div className='hidden md:flex gap-2 mb-3'>
            <div className='w-[23%] text-gray font-medium flex-grow pl-3'>Order#</div>
            <div className='w-[23%] text-gray font-medium flex-grow'>Status</div>
            <div className='w-[23%] text-gray font-medium flex-grow'>Date</div>
            <div className='w-[23%] text-gray font-medium flex-grow'>Total</div>
          </div>
          {
            orders.map(order => (
              <Link href={'/profile/orders/'+order.id} key={order.id} className='flex flex-wrap md:flex-nowrap gap-2  p-3 bg-white rounded-md shadow-sm  mt-3'>
                <div className='w-[48%] md:w-[23%] flex-grow font-semibold'>{order.number}</div>
                <div className='w-[48%] md:w-[23%] flex-grow text-xs '><span className='bg-secondary px-2 py-1 rounded-full inline-block text-white'>{order.status}</span></div>
                <div className='w-[23%] flex-grow'>{order.created_at}</div>
                <div className='w-[23%] flex-grow flex justify-between items-center'><span>{order.total}</span> <Icons.ArrowRight className='fill-gray w-4 h-4'/> </div>
              </Link>
            ))
          }
       </ProfileLayout>
      )
}

export default withAuth(Orders)