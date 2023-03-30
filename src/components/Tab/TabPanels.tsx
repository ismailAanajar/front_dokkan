import {
  Children,
  PropsWithChildren,
} from 'react';

import classNames from 'classnames';

import { useTabs } from './useTabs';

const TabPanels = ({className, children}: PropsWithChildren<{className?: string}>) => {
  const {activeIndex} = useTabs();
  return ( 
    <div className={classNames(className)}>
      {Children.toArray(children)[activeIndex]}
    </div>
   );
}
 
export default TabPanels;