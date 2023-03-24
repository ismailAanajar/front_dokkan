import {
  Children,
  PropsWithChildren,
} from 'react';

import { useTabs } from './useTabs';

const TabPanels = ({children}: PropsWithChildren) => {
  const {activeIndex} = useTabs();
  return ( 
    <div>
      {Children.toArray(children)[activeIndex]}
    </div>
   );
}
 
export default TabPanels;