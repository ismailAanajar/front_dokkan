import { Story } from '@storybook/react';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from './';

export default {
  title: 'Atoms/Tabs',
  decorators: [
    (Story:any) => (
      <div  className='flex justify-center items-center'>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
}


//@ts-ignore
const Template:Story = (args) => (
  <Tabs {...args}>
    <TabList>
      <Tab>tab1</Tab>
      <Tab>tab2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>panel 1</TabPanel>
      <TabPanel>panel 2</TabPanel>
    </TabPanels>
  </Tabs>
)

export const TabComp = Template.bind({});
TabComp.args = {
  activeTab: 1,
  className:'w-[300px]'
};