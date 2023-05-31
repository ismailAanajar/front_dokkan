import { useState } from 'react';

import axios from 'axios';
import classNames from 'classnames';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import { addToCart } from '@dokkan/api/productSlice';
import { Icons } from '@dokkan/assets/icons';
import { Product as ProductComp } from '@dokkan/components';
import Button from '@dokkan/components/Button';
import Carousel from '@dokkan/components/Carousel';
import Count from '@dokkan/components/Cart/Counter/Count';
import Counter from '@dokkan/components/Cart/Counter/Counter';
import Decrement from '@dokkan/components/Cart/Counter/Decrement';
import Increment from '@dokkan/components/Cart/Counter/Increment';
import { useCounterHook } from '@dokkan/components/Cart/Counter/useCounterHook';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@dokkan/components/Tab';
import { useAppDispatch } from '@dokkan/store';

const catalogOptions = {
     slidesPerView:1,
     spaceBetween:30,
     pagination: {
        el: '.custom-swiper-pagination',
        clickable: true,
        renderBullet: function (index:number, className:string) {
          return '<span class="custom-bullet ' + className + '"></span>';
        },
      },
     breakpoints: {
        // when window width is >= 320px
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 480px
        820: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is >= 640px
        1024: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        // when window width is >= 640px
        
      } 
   }

   const prodImages = {
    
   }

function Product({cms, data}:{cms:any, data:any}) {
  if (!data) {
    return 'null'
  }
  const {asPath} = useRouter()
  const dispatch = useAppDispatch()
  const [activatedImage, setActivatedImage] = useState(data.product.images[0].image_url)

  const {increment, decrement, ...counter} = useCounterHook({initialValue:1, min:1, max:Infinity, step:1});
  const updateCartQuantity = (type:'increment' | 'decrement')  => {
    if (type === 'increment') {
      increment()
    }
    else{
      decrement()
    }
  }
  console.log('aspath', window.location.href);
  
  return (
     <>
      <section className='flex flex-wrap gap-4 container py-8'>
        <div className="w-full md:w-[48%]">
           <div className='relative h-[450px]'>
            <Image src={activatedImage} fill  alt='product image'/>
           </div>
           <div className="flex flex-wrap justify-center gap-3 mt-3">
            {
              data.product.images.map((img:{id:number; image_url:string}) => <Image key={img.id} onClick={() => setActivatedImage(img.image_url)} className={classNames('cursor-pointer',{'border border-primary': activatedImage === img.image_url})} src={img.image_url} width={100} height={100} alt='product image'/>)
            }
           </div>
        </div> 
        <div className="w-[48%]">
          <h1 className='text-3xl font-bold mb-3'>{data.product.name}</h1>
          {data.product.category?.name && <div><span className='text-gray'>Category: </span><strong>{data.product.category?.name}</strong></div>}
          {data.product.brand?.name && <div><span className='text-gray'>Brand: </span><strong>{data.product.brand?.name}</strong></div>}
          <h2 className='text-xl font-bold my-3 text-primary'>${data.product.price}</h2>
          <div className='flex gap-5 items-center'>
            <Counter {...counter} increment={() => updateCartQuantity('increment')} decrement={()=> updateCartQuantity('decrement')} className='flex gap-2 '>
                <Increment><Icons.Plus className='w-[18px]' /></Increment>
                <Count/>
                <Decrement><Icons.Minus/></Decrement>
            </Counter>
            <Button variant='primary' onClick={() => dispatch(addToCart(data.product.id))}>Add to cart</Button>
          </div>
          <div className='flex gap-3 h-10 mt-5'>
      <FacebookShareButton url={window.location.href} quote={'i recommend this product'}>
        <FacebookIcon round size={30}/>
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href} title={'i recommend this product'}>
        <TwitterIcon round size={30}/>
      </TwitterShareButton>
      <PinterestShareButton url={window.location.href} media={window.location.href}  title={'i recommend this product'}>
        <PinterestIcon round size={30}/>
      </PinterestShareButton>
    </div>
        </div> 
        
      </section>
      <section className="container py-3">
        <Tabs>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Reviews</Tab>
          </TabList>
          <TabPanels className='p-2'>
            <TabPanel className="bg-white p-3">
              {parse(data.product.description)}
            </TabPanel>
            <TabPanel>
              reviews
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
      <section className='container my-4 bg-white p-3'>
        <h1 className='text-2xl mb-2'>Related products</h1>
        <Carousel data={{ content:data.related_products, ComponentName:ProductComp,}} options={catalogOptions}/> 
      </section>
      <section className='flex flex-wrap gap-3 container my-8'>
          
          {/* {
            cms.map((item:any) => {
              
              switch (item.name) {
                case 'link_image':
                case 'text_image':
                  return '<Offer {...item}/>'
                case 'custom_html':
                  
                  return (
                    <div className="" style={{ width: item.width + '%' }}>
                      {parse(item.html)}
                    </div>
                  )
              
                case 'code_editor':
                  
                  return <div className="w-full" > 
                      <Js htmlString={item.js}/>
                      {<Css cssString={item.css}/>}
                      {parse(item.html)}
                    </div>
                  break;
              }
            })
          } */}
        </section>
     
     </>
  )
}



//@ts-ignore
export const getServerSideProps = async context => {
  // const {dispatch} = store 
  // const cms = await axios.get('http://localhost:8000/api/v1/cms/about');
  const resp = await axios.get('http://localhost:8000/api/v1/products/'+context.query.id);
  return {
    props: {
      data: resp.data
    }
  }
} 

export default Product 