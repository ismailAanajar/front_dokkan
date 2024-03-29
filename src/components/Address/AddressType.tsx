import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addAddress } from '@dokkan/api/addressSlice';
import { Field } from '@dokkan/api/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';
import {
  errorHandling,
  resetForm,
  rules,
} from '@dokkan/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import FormGroup from '../Inputs/FormGroup';

const countries = [
  {
    value: 'country1',
    label: 'country1'
  },
  {
    value: 'country1',
    label: 'country1'
  },
]

function AddressType({type, values, action}: {type: 'shipping' | 'billing', values?: Field[], action?: 'create' | 'update'}) {
  const dispatch = useAppDispatch()
  const addresses = useAppSelector(state => state.app.forms)
  const {loading, error} = useAppSelector(state => state.address)
  
 const schema = z.object(rules(addresses[type]));

  const {control, handleSubmit, setError, reset } = useForm({resolver: zodResolver(schema)})
 const onSubmit = (data:any) => {dispatch(addAddress({type, data, action}))} ;

  
  

  useEffect(() => {
    
    if (error?.errors) {
      errorHandling({error, setError})
    }
  }, [error])

   useEffect(() => {
     reset(resetForm(values || addresses[type])); 
  }, [type])

  
  return (
    <div>
      <form onSubmit={(handleSubmit(onSubmit))} className='grid grid-cols-1 md:grid-cols-2 gap-x-4 p-2 '>
        {
          addresses[type]?.map(({id, ...field}:Field) => {
            return <FormGroup control={control} {...field}  placeholder={field.label} className=" !py-0 " options={countries}/>
          })
        }
        <Button loading={loading} variant='primary' type='submit' className='md:col-span-2 col-start-1'>Add</Button>

      </form>
    </div>
  )
}

export default AddressType