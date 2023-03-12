import React, {
  ComponentProps,
  PropsWithChildren,
} from 'react';

import classNames from 'classnames';
import Link from 'next/link';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'link';
  href?: string;
} & ComponentProps<'button'>

const Button = ({href, variant, children, className, ...rest}:PropsWithChildren<ButtonProps>) => {
  const classes = classNames(
    'py-2 px-4  font-semibold  shadow-md  focus:outline-none focus:ring-2 focus:ring-opacity-75',
    {
      'bg-primary text-white': variant==='primary',
      'bg-secondary text-white': variant==='secondary', 
      'bg-none shadow-none py-0 px-0 text-primary': variant==='link', 
    },
    className
  )
  const button = href ? <Link href={href}>{children}</Link>: children
  return (
    <button  className={classes} {...rest}>{button}</button>
  )
}

export default Button