import { PropsWithChildren } from 'react';

import classNames from 'classnames';

import { useTabs } from './useTabs';

const Tab = ({index, ...props}:PropsWithChildren<{index: number}>) => {

  const {activeIndex, setActiveIndex} =  useTabs();
  return ( 
    <div className={classNames('cursor-pointer p-2 flex-grow text-center bg-gray_light ',{'text-white !bg-primary ': activeIndex === index})}  onClick={() => setActiveIndex(index)} {...props}/>  
   );
}
 
export default Tab;