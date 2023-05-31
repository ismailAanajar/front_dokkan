import { ComponentProps } from 'react';

import {
  Control,
  useController,
} from 'react-hook-form';

export type InputProps = {
  control?: Control
} & ComponentProps<'input'>

function Input(props: InputProps) {

  const {field, fieldState} = useController({
    name: props.name || '', control: props?.control
  })
  
  return (
    <>
      <input className='bg-input_bg outline-none py-2 px-4 ' {...props} {...field}/>
      {fieldState.error &&<p className='text-red text-[10px] absolute -bottom-4 left-0' >{fieldState.error.message}</p>}
    </>
  )
}

export default Input