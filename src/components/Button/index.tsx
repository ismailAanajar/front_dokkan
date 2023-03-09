import React, { PropsWithChildren } from 'react';

import classNames from 'classnames';
import Link from 'next/link';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  href?: string;
  type?: 'submit' | 'button';
  onClick?: () => void
}

const Button = ({href, variant, children, ...rest}:PropsWithChildren<ButtonProps>) => {
  const classes = classNames(
    'py-2 px-4 text-white font-semibold  shadow-md  focus:outline-none focus:ring-2 focus:ring-opacity-75',
    {
      'bg-primary': variant==='primary',
      'bg-secondary': variant==='secondary' 
    }
  )
  const button = href ? <Link href={href}>{children}</Link>: children
  return (
    <button {...rest} className={classes}>{button}</button>
  )
}

export default Button