import React, { PropsWithChildren } from 'react';

import classNames from 'classnames';

function StepLayout({children}: PropsWithChildren) {
  return (
     <div className='flex gap-4 flex-wrap items-start'>
      {children}
    </div>   

  )
}

function Right({children, className}: PropsWithChildren<{className?: string}>) {
  return (
    <div className={classNames('w-full lg:w-[68%] ', className)}>
      {children}
    </div>
  )
}

function Left({children, className}:PropsWithChildren<{className?: string}>) {
  return (
     <div className={classNames('w-full lg:w-[28%] bg-white p-3 rounded-md', className)}>
      {children}
     </div>
  )
}

StepLayout.Right = Right;
StepLayout.Left = Left;

export default StepLayout