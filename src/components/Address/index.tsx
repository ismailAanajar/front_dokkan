import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '../Tab';
import AddressType from './AddressType';

const Addresses = ({type}:{type: 0 | 1}) => {
  
  return (
    <Tabs activeTab={type}>
      <TabList>
        {/* @ts-ignore */}
        <Tab>Shipping</Tab>
        {/* @ts-ignore */}
        <Tab>Belling</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
            <AddressType type='shipping'/>    
        </TabPanel>
        <TabPanel>
          <AddressType type='belling'/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}


export default Addresses;