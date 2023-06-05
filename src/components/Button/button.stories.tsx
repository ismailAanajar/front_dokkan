import { PropsWithChildren } from 'react';

import { Story } from '@storybook/react';

import Button, { ButtonProps } from './';

const Center = ({children}:PropsWithChildren) => {
  return <div className='bg-primary'>{children}</div>
}

export default {
  title: 'Atoms/Button',
  component: Button,
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
const Template:Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  disabled: true
};
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary'
};
export const OUtline = Template.bind({});
OUtline.args = {
  variant: 'outline',
  
};
export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  variant: 'primary',
  disabled: false
};