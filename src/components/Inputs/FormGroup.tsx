import {
  ComponentProps,
  ComponentType,
  SVGProps,
} from 'react';

import classNames from 'classnames';
import { Control } from 'react-hook-form';

import {
  IconK,
  Icons,
} from '@dokkan/assets/icons';

import Checkbox from './Checkbox';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';

type Props = {
  control: Control;
  icon?: IconK;
  label?: string;
  className?: string;
  value?: string | number | boolean | undefined;
  options?:  {
    value: string | number;
    label: string | number;
}[]
  
} & ComponentProps<'input'> & ComponentProps<'textarea'> & ComponentProps<'select'>

const FormGroup = (props: Props) => {

  const {label, icon, className, options, ...rest} = props; 
  let field = null;

  switch (props.type) {
    case 'email':
    case 'password':
    case 'text':
    case 'number':
      field = <Input {...rest}/>
      break;
    case 'checkbox':
      field = <Checkbox {...props} />  
      break;
    case 'textarea':
      field = <Textarea {...rest} />  
      break;
    case 'select':
      field = <Select {...rest} options={options}/>  
      break;
    default:
      break;
  }

  const Icon: ComponentType<{className: string}> | undefined | ComponentType<SVGProps<SVGSVGElement>> = icon && Icons[icon]

  return ( 
    <div className={classNames('my-4', className)}>
      {label && props.type !== 'checkbox' ? <label className='text-xs text-gray'>{label}</label> : null}
      <div className={classNames('relative', {
        'border border-input_border flex items-center p-[2px]': props.type !== 'checkbox' 
      })}>
        { Icon && <div className='p-2'><Icon className="stroke-primary text-primary fill-primary"/></div>}
         <div className='flex-grow [&>input]:w-full'>{field}</div>
      </div>
    </div>
   );
}


 
export default FormGroup;