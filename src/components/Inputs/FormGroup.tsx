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
import Textarea from './Textarea';

type Props = {
  control: Control;
  icon?: IconK;
  label?: string;
  
} & ComponentProps<'input'> & ComponentProps<'textarea'>

const FormGroup = (props: Props) => {

  const {label, icon, ...rest} = props; 
  let field = null;

  switch (props.type) {
    case 'email':
    case 'password':
    case 'text':
      field = <Input {...rest}/>
      break;
    case 'checkbox':
      field = <Checkbox {...props} />  
      break;
    case 'textarea':
      field = <Textarea {...rest} />  
      break;
    default:
      break;
  }

  const Icon: ComponentType<{className: string}> | undefined | ComponentType<SVGProps<SVGSVGElement>> = icon && Icons[icon]

  return ( 
    <div className='my-4'>
      {label && props.type !== 'checkbox' ? <label className='text-xs text-secondary'>{label}</label> : null}
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