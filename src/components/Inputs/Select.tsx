import { useState } from 'react';

import {
  Control,
  useController,
} from 'react-hook-form';
import ReactSelect from 'react-select';

type Props = {
  require?: boolean;
  control?: Control;
  name?: string;
  options?:{
    value: string | number;
    label:string | number
  }[]
} 

function Select(props: Props) {
  const [option, setOption ]= useState('')
  const val = props.options?.find(
      (option:any) => option.value === option    );
   const {field, fieldState } = useController({
    name: props.name || '', control: props.control
  })

  
  const handleChange = (val:any) => {
    console.log(val);
    setOption(val)
    
  }  
  return (
    <>
      <ReactSelect   className='!bg-input_bg outline-none  w-full' styles={{
          control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: 'transparent', border:'none', outline: 'none'     }),
          }}
          options={props.options}
       {...props}  {...field} 
    />
      {fieldState.error &&<p className='text-red text-[10px] absolute -bottom-4 left-0' >{fieldState.error.message}</p>}
    </>

  )
}

export default Select