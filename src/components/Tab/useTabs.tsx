import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

const TabContext = createContext({
  activeIndex: 0,
  setActiveIndex: (index: number) => {} 
})

const TabProvider = (props: PropsWithChildren<{activeTab?: number}>) => {
  const [activeIndex, setActiveIndex] = useState(props.activeTab || 0);
  // @ts-ignore
  return <TabContext.Provider value={{activeIndex, setActiveIndex}} {...props}/>
}

const useTabs = () => {
  const context = useContext(TabContext);
  if(!context) throw new Error('useTab must be used inside TabProvider');
  return  context;
}

export { TabProvider, useTabs };