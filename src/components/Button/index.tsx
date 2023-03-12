import React, {
  ComponentProps,
  PropsWithChildren,
} from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import Loader from '../Loader/Loader';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'link';
  href?: string;
  loading?: boolean;
} & ComponentProps<'button'>

const Button = ({href, variant, children, className, loading, ...rest}:PropsWithChildren<ButtonProps>) => {
  const classes = classNames(
    '  items-center py-2 px-4 cur  font-semibold  shadow-md  focus:outline-none focus:ring-2 focus:ring-opacity-75',
    {
      'bg-primary text-white': variant==='primary',
      'bg-secondary text-white': variant==='secondary', 
      'bg-none shadow-none py-0 px-0 text-primary': variant==='link', 
      'flex gap-2 justify-between disabled cursor-auto': loading,
    },
    className
  )
  const button = href ? <Link href={href}>{children}</Link>: children
  return (
    <button  className={classes} {...rest}>
      {button}
      {loading && <Loader button/>}
    </button>
  )
}

export default Button