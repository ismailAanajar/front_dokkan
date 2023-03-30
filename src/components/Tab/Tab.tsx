import { PropsWithChildren } from 'react';

import classNames from 'classnames';

import { useTabs } from './useTabs';

const Tab = ({index=0, inactiveClasses, activeClasses = '', ...props}:PropsWithChildren<{index?: number, inactiveClasses?: string, activeClasses?: string}>) => {

  const {activeIndex, setActiveIndex} =  useTabs();
  return ( 
    <div className={classNames('cursor-pointer p-2 flex-grow text-center bg-gray_light ', inactiveClasses,{'text-white !bg-primary ' : activeIndex === index, [activeClasses]: activeIndex === index})}  onClick={() => setActiveIndex(index)} {...props}/>  
   );
}
 
export default Tab;