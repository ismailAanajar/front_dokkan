import {
  Children,
  cloneElement,
  PropsWithChildren,
} from 'react';

const TabList = ({children}: PropsWithChildren) => {
  return ( 
    <div className="flex">
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