import { PropsWithChildren } from 'react';

import { useForm } from 'react-hook-form';

import { Story } from '@storybook/react';

import FormGroup from './FormGroup';

const Center = ({children}:PropsWithChildren) => {
  return <div className='bg-primary'>{children}</div>
}





const InputDemo = (props:any) => {
const {control} = useForm()

  return <FormGroup control={control} {...props}/>
}


export default {
  title: 'Atoms/Input',
  component: InputDemo,
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
const Template:Story<ButtonProps> = (args) => <InputDemo {...args}/>

export const InputField = Template.bind({});
InputField.args = {
  type: 'select',
  placeHolder: 'placeholder',
  // icon: 'Email'
};
export const SelectField = Template.bind({});
SelectField.args = {
  type: 'select',
  placeHolder: 'placeholder',
  options: [
    {
      label: 'label1',
      value: 'value1'
    },
    {
      label: 'label2',
      value: 'value2'
    },
  ]
  // icon: 'Email'
};