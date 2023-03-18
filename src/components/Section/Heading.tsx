import { PropsWithChildren } from 'react';

import classNames from 'classnames';

function Heading({children, className}: PropsWithChildren<{className?: string}>) {
  return (
    <div className={classNames('text-center text-2xl font-semibold',className)}>{children}</div>
  )
}

export default Heading