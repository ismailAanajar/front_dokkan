import { Story } from '@storybook/react';

import Count from './Count';
import Counter from './Counter';
import Decrement from './Decrement';
import Increment from './Increment';
import { useCounterHook } from './useCounterHook';

export default {
  title: 'Atoms/Counter',
  // component: Button,
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
const Template:Story<ButtonProps> = (args) => {
  const  counter= useCounterHook({initialValue:10, min:0, max:55})
  return (
    <Counter {...args} {...counter}>
      <Increment>+</Increment>
      <Count count={counter.count}/>
      <Decrement>-</Decrement>  
    </Counter>
  )
}

export const Counterr = Template.bind({});
Counterr.args = {
  className: 'flex'
};