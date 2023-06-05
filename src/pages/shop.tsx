import 'react-input-range/lib/css/index.css';

import {
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import classNames from 'classnames';
import {
  AnimatePresence,
  m,
} from 'framer-motion';
import { useRouter } from 'next/router';
import {
  useController,
  useForm,
} from 'react-hook-form';
import InputRange from 'react-input-range';

import { getProducts } from '@dokkan/api/productSlice';
import { Product as ProductType } from '@dokkan/api/types';
import { Icons } from '@dokkan/assets/icons';
import { Product } from '@dokkan/components';
import Button from '@dokkan/components/Button';
import FormGroup from '@dokkan/components/Inputs/FormGroup';
import Loader from '@dokkan/components/Loader/Loader';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

type Props = {
  data: {
    products: ProductType[];
    categories: any[];
    brands: any[];
  }
}
const modal: any = {
  hidden: {
    opacity: 0,
    y: '-100vh',
    x: '-50%'
  },
  visible: {
    opacity: 1,
    y: '-50%',
    transition: {delay: 0.3 }
  }
}
function Shop({data}:Props) {
  const [showFilter, setShowFilter] = useState(false)
  const [sliderValues, setSliderValues] = useState<{ min: number, max: number } | number >({ min: 0, max: 100 });
  const [filterValues, setFilterValues] = useState<{id:number; label: string, value: number | string, name:string}[]>([])
  const ref = useRef<HTMLButtonElement>(null)
  const {data: filter, loading} = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const {control, handleSubmit, setError, reset,getValues } = useForm()
  const {pathname, push} = useRouter()
  const {field:{onChange, ...rest}, fieldState } = useController({
    name: 'price'|| '', control: control
  })

  
  
  const filterHandler = (data:any) => {
    const filter = {
      category_id: data.category?.value,
      brand_id: data.brand?.value,
      price_min: data.price?.min,
      price_max: data.price?.max,
      search: data.search
    }

    dispatch(getProducts(filter))
    setShowFilter(false);
    
    const filterVals = [
      {
        id:1,
        label: data.category?.label,
        value: data.category?.value,
        name: 'category'
      },
      {
        id:2,
        label: data.brand?.label,
        value: data.brand?.value,
        name: 'brand'
      },
      {
        id:3,
        label: 'min: '+ data.price?.min,
        value: data.price?.min,
        name: 'price'
      },
      {
        id:4,
        label: 'max: ' + data.price?.max,
        value: data.price?.max,
        name: 'price'
      },
    ].filter(item => item.value)

    const queries= filterVals.map((result, item) => {
      //@ts-ignore
  const currentURL = new URL(window.location.href);
    currentURL.searchParams.set(result.name, result.label);
    window.history.replaceState({}, '', currentURL);
})
   

    setFilterValues(filterVals)
  }


  const removeFilter = (item:{id: number, name: string}) => {
    setFilterValues(prev => prev.filter(el => el.id !== item.id))
    reset({[item.name]: ''})
    ref.current?.click()
    
  }

  

  return (
    <>
      <div className="container  flex-wrap gap-3 my-7 items-start">
        
        <div className='sticky top-0 mb-3 z-50  flex justify-between gap-3 flex-wrap items-center bg-[#f6f9fc]'>
          {filterValues.length > 0 && <div className="flex mb-4 w-full gap-3 bg-white p-2">                                                                     
            {
              filterValues.map(item => <div className='bg-primary_light text-primary gap-2 flex items-center px-0.5 pl-1 text-xs rounded-md'><span>{item.label} </span><span>|</span> <button onClick={() => removeFilter(item)} className='text-gray_light p-1'>X</button></div>)
            }
          </div>}
          <div className='bg-white flex w-full justify-between gap-3 p-2 items-center'>
            <Button onClick={() => setShowFilter(prev => !prev)} variant='primary' className='shadow-none flex items-center gap '><Icons.Filter className='fill-white'/></Button>
            <form onSubmit={handleSubmit(filterHandler)}  className='flex gap-3 items-center '>
              <FormGroup className='!my-0' type='text' name='search' control={control} placeholder='search for product'/>
              <Button variant='primary'>search</Button>
            </form>
          </div>
           <AnimatePresence mode='wait'>
           <m.form variants={modal} onSubmit={handleSubmit(filterHandler)} id='form' className={classNames("absolute top-full left-0 w-full bg-white shadow-md rounded-md p-3",{'hidden': !showFilter})}>
            <FormGroup control={control} type='select' name='category' label='category' options={data.categories.map(cat => ({value: cat.id, label: cat.name}))}/>
            <FormGroup control={control} type='select' name='brand' label='brands' options={data.brands.map(br => ({value: br.id, label: br.name}))}/>
            <div className="mb-8">
              <span className='block text-xs text-gray mb-8'>price</span>
              <InputRange
                minValue={0}
                maxValue={800}
                {...rest}
                value={sliderValues}
                
                onChange={value =>{onChange(value);
                  setSliderValues(value)}}
                  
              />
            </div>

            <div className='flex justify-between'>
              <Button ref={ref}  type="submit" variant='primary' >Filter</Button>
              <Button type='button' variant='link' >reset</Button>
            </div>
          </m.form>
         </AnimatePresence>
        </div>
        {loading ? <div className='h-[300px] flex justify-center items-center'><Loader  full/></div> : <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {
             (filter?.products || data.products).map(product => (
              <div className="" key={product.id}>
                <Product {...product}/>
              </div>
            ))
          }
        </div>}
      </div>
     <div className='flex flex-wrap gap-3 container my-8'>
        
          {
            // cms.map((item:any) => {
              
            //   switch (item.name) {
            //     case 'link_image':
            //     case 'text_image':
            //       return '<Offer {...item}/>'
            //     case 'custom_html':
                  
            //       return (
            //         <div className="" style={{ width: item.width + '%' }}>
            //           {parse(item.html)}
            //         </div>
            //       )
              
            //     case 'code_editor':
                  
            //       return <div className="w-full" > 
            //           <Js htmlString={item.js}/>
            //           {<Css cssString={item.css}/>}
            //           {parse(item.html)}
            //         </div>
            //       break;
            //   }
            // })
          }
        </div>
    </>
  )
}



//@ts-ignore
export const getServerSideProps = async args => {
  // const {dispatch} = store 
  const prods = await axios.get('http://localhost:8000/api/v1/products');
  // const cms = await axios.get('http://localhost:8000/api/v1/cms/shop');
  return {
    props: {
      data: prods.data,
      // cms: cms.data:
    }
  }
} 

export default Shop 