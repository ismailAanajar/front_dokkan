import React, {
  ComponentProps,
  PropsWithChildren,
} from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import Loader from '../Loader/Loader';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'link' | 'outline';
  href?: string;
  loading?: boolean;
} & ComponentProps<'button'>

const Button = ({href, variant, children, className, loading, ...rest}:PropsWithChildren<ButtonProps>) => {
  const classes = classNames(
    ' rounded-md items-center  cur  font-semibold  shadow-md  ',
    {
      'py-2 px-4': !href,
      'bg-primary text-white': variant==='primary',
      'bg-secondary text-white': variant==='secondary', 
      'bg-none shadow-none py-0 px-0 text-primary': variant==='link', 
      'bg-none shadow-none py-0 px-0 text-primary border border-primary': variant==='outline', 
      'flex gap-2 justify-between disabled cursor-auto': loading,
    },
    className
  )
  const button = href ? <Link href={href} className='block py-2 px-4'>{children}</Link>: children
  return (
    <button  className={classes} {...rest}>
      {button}
      {loading && <Loader button/>}
    </button>
  )
}

export default Button