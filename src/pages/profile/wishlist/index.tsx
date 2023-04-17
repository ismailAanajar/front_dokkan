import { Product as ProductType } from '@dokkan/api/types';
import { Product } from '@dokkan/components';
import Button from '@dokkan/components/Button';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import { useAppSelector } from '@dokkan/store';

function index() {
  const wishlist = useAppSelector<ProductType[]>(state => state.user.userInfo.wishlist)
  return (
    <ProfileLayout page="wishlist" >
       <ProfileLayout.header>
        <h2 className='mt-3 md:mt-0 text-2xl font-bold mb-3 capitalize'>My wishlist</h2>
        <Button variant='link' className='shadow-none text-primary bg-primary_light !px-3 py-2'>Add all to cart</Button>
      </ProfileLayout.header>
       <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>
          {
            wishlist.map(item => <Product key={item.id} {...item} wishlist/>)
          }
        </div>
    </ProfileLayout>
  )
}

export default index