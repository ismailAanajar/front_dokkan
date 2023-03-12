import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signUp } from '@dokkan/api/authSlice';
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

const register: Field[] = [
  {
    id:1,
    label: 'full name',
    name: 'fullName',
    type: 'text',
    icon: 'User',
  },
  {
    id:2,
    label: 'email',
    name: 'email',
    type: 'email',
    icon: 'Envelope',
  },
  {
    id:3,
    label: 'password',
    name: 'password',
    type: 'password',
    icon: 'Lock',
  },
  {
    id:4,
    name: 'password_confirmation',
    label: 'confirm password',
    type: 'password',
    icon: 'Lock',
  },
  {
    id:5,
    label: 'by sign up you are agree to <a href="#">Terms&condition</a>',
    name: 'privacy',
    type: 'checkbox',
  },
]

function Register() {
  const schema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
  }).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"], // path of error
  });

  const {control, handleSubmit, setError } = useForm({resolver: zodResolver(schema)})
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.auth)
 const onSubmit = (data:any) => dispatch(signUp(data))  ;

  useEffect(() => {
    if (error?.errors) {
      errorHandling({error, setError})
    }
  }, [error])
  
 
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        register.map(({id, ...field}) => {
          return <FormGroup control={control} {...field}  placeholder={field.label} />
        })
      }
      <div className="flex justify-between pt-5 [&>*]:flex-grow gap-7">
        <Button loading={loading}  type='submit'  variant='primary'>Register</Button>
        <Button type='button' onClick={()=>dispatch(openModal({comp: 'login'}))} variant='secondary'>Login</Button>
      </div>
    </form>
  )
}

export default Register