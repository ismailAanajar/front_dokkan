import { ComponentProps } from 'react';

import {
  Control,
  useController,
} from 'react-hook-form';

type Props = {
  label?: string;
  control: Control;
} & ComponentProps<'input'>



function Checkbox(props:Props) {
   const {field, fieldState} = useController({
    name: props.name || '', control: props.control
  })
  return (
    <div>
      
            <input {...props} {...field} type="checkbox" className='peer absolute opacity-0' id={props.name}/>
          <label htmlFor={props.name} className='peer-checked:after:block after:hidden relative flex items-center gap-2 after:content-[""] after:block after:w-[5px] after:h-[10px] after:border-r after:border-b after:border-primary after:absolute after:rotate-45 after:top-1/2 after:-translate-y-[65%] after:left-[7px] before:content-[""] before:block before:border before:border-primary before:w-[20px] before:h-[20px] before:flex-shrink-0'>
            <span>{props.label}</span>
          </label>
         
    </div>
  )
}

export default Checkbox