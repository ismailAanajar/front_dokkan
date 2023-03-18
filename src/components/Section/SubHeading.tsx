import { PropsWithChildren } from 'react';

import classNames from 'classnames';

function SubHeading({children, className}: PropsWithChildren<{className?: string}>) {
  return (
    <div className={classNames('text-center md:w-[70%] mx-auto mb-4 text-gray',className)}>{children}</div>
  )
}

export default SubHeading