import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { singIn } from '@dokkan/api/authSlice';
import { openModal } from '@dokkan/api/modalSlice';
import { useAppDispatch } from '@dokkan/store';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import FormGroup from '../Inputs/FormGroup';

function Login() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
  const {control, formState:{errors}, handleSubmit } = useForm({resolver: zodResolver(schema)})
  const dispatch = useAppDispatch();
 const onSubmit = (data:any) => dispatch(singIn(data))  ;

//  console.log(errors);
 
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup control={control} name='email' type='email' placeholder='email' label='Your email' icon='Envelope'/>
      <FormGroup control={control} name='password' type='password' placeholder='password' label='Your password' icon='Lock'/>
      <FormGroup control={control} name='remember'  type="checkbox" label='remember'/>
      <div className="flex justify-between pt-5 [&>*]:flex-grow gap-7">
        <Button type='submit' variant='primary'>Login</Button>
        <Button  type='button' onClick={()=>dispatch(openModal({name: 'register'})  )} variant='secondary'>Register</Button>
      </div>
      <p className='text-sm text-secondary mt-3'>Forgot your password?<Button onClick={()=>dispatch(openModal({name: 'forget'}) )} variant='link'>Reset It</Button></p>
    </form>
  )
}

export default Login