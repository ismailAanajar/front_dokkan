import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn } from '@dokkan/api/authSlice';
import { openModal } from '@dokkan/api/modalSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';
import { errorHandling } from '@dokkan/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import FormGroup from '../Inputs/FormGroup';

function ForgetPassword() {
  const schema = z.object({
    email: z.string().email(),
  })
  const {control, handleSubmit, setError } = useForm({resolver: zodResolver(schema)})
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.auth)
 const onSubmit = (data:any) => dispatch(signIn(data))  ;

  useEffect(() => {
    if (error?.errors) {
      errorHandling({error, setError})
    }
  }, [error])
 
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup control={control} name='email' type='email' placeholder='email' label='Your email' icon='Envelope'/>      <div className="flex justify-between pt-5 [&>*]:flex-grow gap-7">
        <Button loading={loading} type='submit' variant='primary'>Submit</Button>
      </div>
      <p className='text-sm text-secondary mt-3'>have an account?<Button variant='link' onClick={()=>dispatch(openModal({comp: 'login'}))} >Login</Button></p>
    </form>
  )
}

export default ForgetPassword