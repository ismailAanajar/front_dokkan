import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn } from '@dokkan/api/authSlice';
import { openModal } from '@dokkan/api/modalSlice';
import { IconK } from '@dokkan/assets/icons';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';
import { errorHandling } from '@dokkan/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import FormGroup from '../Inputs/FormGroup';

type Field = {
  id: number,
  label: string,
  name: string,
  type: string,
  icon?: IconK
}

const login: Field[] = [
  {
    id:1,
    label: 'email',
    name: 'email',
    type: 'email',
    icon: 'Envelope',
  },
  {
    id:2,
    label: 'password',
    name: 'password',
    type: 'password',
    icon: 'Lock',
  },
  {
    id:3,
    label: 'remember',
    name: 'remember',
    type: 'checkbox',
  },
]  

function Login() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
  const {control, formState:{errors}, handleSubmit, setError } = useForm({resolver: zodResolver(schema)})
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
      {
        login.map(({id, ...field}) => {
          return <FormGroup control={control} {...field}  placeholder='email'/>
        })
      }
      <div className="flex justify-between pt-5 [&>*]:flex-grow gap-7">
        <Button loading={loading} type='submit' variant='primary'>Login</Button>
        <Button  type='button' onClick={ ()=>dispatch(openModal({comp: 'register'})) } variant='secondary'>Register</Button>
      </div>
      <p className='text-sm text-secondary mt-3'>Forgot your password?<Button onClick={()=>dispatch(openModal({comp: 'forget'}) )} variant='link'>Reset It</Button></p>
    </form>
  )
}

export default Login