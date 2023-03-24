import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
} from '@dokkan/api/authSlice';
import { openModal } from '@dokkan/api/modalSlice';
import { Field } from '@dokkan/api/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';
import {
  errorHandling,
  rules,
} from '@dokkan/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../Button';
import FormGroup from '../Inputs/FormGroup';

const actions = {
  register: signUp,
  login: signIn,
  forget: forgetPassword,
  reset: resetPassword
}
const orActions = {
  register: 'login',
  login: 'register',
  reset: 'login',
  forget: 'login'
} 

function AuthType({type}: {type: 'register' | 'login' | 'forget' | 'reset'}) {
  const forms = useAppSelector(state => state.app.forms)
  
  const schema = z.object(rules(forms[type]));

  console.log(rules(forms[type]));
  

  const {control, handleSubmit, setError, reset } = useForm({resolver: zodResolver(schema)})
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.auth)
  // @ts-ignore
 const onSubmit = (data:any) => dispatch(actions[type](data))  ;
  useEffect(() => {
     reset(forms[type].reduce((acc:any, curr:any) => {
      acc[curr.name] = ''
      return acc
     },{})); 
  }, [type])
  useEffect(() => {
    if (error?.errors) {
      
      errorHandling({error, setError})
    }
  }, [error])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          forms[type].map(({id, ...field}: Field) => {
            return <FormGroup key={id} control={control} {...field}  placeholder={field.label} />
          })
        }
        <div className="flex justify-between pt-5 [&>*]:flex-grow gap-7">
          <Button loading={loading}  type='submit'  variant='primary'>{type}</Button>
          <Button type='button' onClick={()=>dispatch(openModal({comp: 'auth', props:{type:orActions[type]}}))} variant='secondary'>{orActions[type]}</Button>
        </div>
      {type === 'login' && <p className='text-sm mt-3'>Forgot your password?<Button onClick={()=>dispatch(openModal({comp: 'auth', props:{type: 'forget'}}) )} variant='link'>Reset It</Button></p>}
      </form>

    </>
  )
}

export default AuthType