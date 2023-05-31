import React, {
  ComponentProps,
  forwardRef,
  LegacyRef,
  PropsWithChildren,
} from 'react';

import classNames from 'classnames';
import Link from 'next/link';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'link' | 'outline';
  href?: string;
  loading?: boolean;
} & ComponentProps<'button'>

const Button = ({href, variant, children, className, loading,  ...rest}:PropsWithChildren<ButtonProps>, ref:LegacyRef<HTMLButtonElement>) => {
  const classes = classNames(
    ' rounded-md items-center  cur  font-semibold  shadow-md disabled:bg-gray ',
    {
      'py-2 px-4': !href,
      'bg-primary text-white': variant==='primary',
      'bg-secondary text-white': variant==='secondary', 
      'bg-none shadow-none py-0 px-0 text-primary': variant==='link', 
      'bg-none shadow-none py-0 px-0 text-primary border border-primary': variant==='outline', 
      'flex gap-2 justify-between disabled cursor-auto ': loading,
    },
    className
  )
  const button = href ? <Link href={href} >{children}</Link>: children
  return (
    <button ref={ref}  className={classes} {...rest}>
      {button}
      {loading && <div
          className=""
          >
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>}
    </button>
  )
}

export default forwardRef(Button)