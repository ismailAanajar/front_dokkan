import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { singIn } from '@dokkan/api/authSlice';
import { openModal } from '@dokkan/api/modalSlice';
import { useAppDispatch } from '@dokkan/store';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import FormGroup from '../Inputs/FormGroup';

function ForgetPassword() {
  const schema = z.object({
    email: z.string().email(),
  })
  const {control, handleSubmit } = useForm({resolver: zodResolver(schema)})
  const dispatch = useAppDispatch();
 const onSubmit = (data:any) => dispatch(singIn(data))  ;

//  console.log(errors);
 
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup control={control} name='forget_password-' type='email' placeholder='email' label='Your email' icon='Envelope'/>      <div className="flex justify-between pt-5 [&>*]:flex-grow gap-7">
        <Button type='submit' variant='primary'>Submit</Button>
      </div>
      <p className='text-sm text-secondary mt-3'>have an account?<Button variant='link' onClick={()=>dispatch(openModal({name: 'login'}))} >Login</Button></p>
    </form>
  )
}

export default ForgetPassword