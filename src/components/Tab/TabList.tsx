import {
  Children,
  cloneElement,
  PropsWithChildren,
} from 'react';

import classNames from 'classnames';

const TabList = ({children, className }: PropsWithChildren<{className?: string}>) => {
  return ( 
    <div className={classNames('flex', className)}>
      {
        Children.map(children, (child, index) => {
          // @ts-ignore
          return cloneElement(child, {index})
        })
      }
    </div>
   );
}
 
export default TabList;