import { PropsWithChildren } from 'react';

const TabPanel = (props:PropsWithChildren<{className?:string}>) => {
  return ( 
    <div  {...props}/>
   );
}
 
export default TabPanel;