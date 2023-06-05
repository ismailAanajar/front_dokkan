import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
} from '@dokkan/api/authSlice';
import {
  closeModal,
  openModal,
} from '@dokkan/api/modalSlice';
import { Field } from '@dokkan/api/types';
import { useLocalStorage } from '@dokkan/hooks';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';
import {
  errorHandling,
  resetForm,
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
  forgot: 'login'
} 

function AuthType({type, action, from}: {type: 'register' | 'login' | 'forgot' | 'reset', action: string, from?: string}) {
  const forms = useAppSelector(state => state.app.forms)
  
  
  const schema = z.object(rules(forms?.[type]));
 

  const {control, handleSubmit, setError, reset } = useForm({resolver: zodResolver(schema)})
  const dispatch = useAppDispatch();
  const {setStep} = useLocalStorage()
  const {loading, error, token, hadRegister} = useAppSelector(state => state.auth);
  const {replace} = useRouter()



  
  // @ts-ignore
 const onSubmit = (data:any) => dispatch(actions[type]({data:data}))  ;
  useEffect(() => {
     reset(resetForm(forms?.[type])); 
  }, [type])

  useEffect(() => {
    if (error?.errors) {
      
      errorHandling({error, setError})
    }
  }, [error])

  useEffect(() => {
    if (token) {
      setStep('details')
      dispatch(closeModal());
    }
    
    if (token && from) {
      replace(from)
    }
  },[token, from])

  useEffect(() => {
    if (hadRegister) {
      dispatch(openModal({text: hadRegister}))  
    }
  },[hadRegister])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          forms?.[type].map(({id, ...field}: Field) => {
            return <FormGroup key={id} control={control} {...field}  placeholder={field.label} />
          })
        }
        <div className="flex justify-between pt-5 [&>*]:flex-grow gap-7">
          <Button loading={loading}  type='submit'  variant='primary'>{type}</Button>
          <Button type='button' onClick={()=>dispatch(openModal({comp: 'auth', props:{type:orActions[type]}}))} variant='secondary'>{orActions[type]}</Button>
        </div>
      {type === 'login' && <p className='text-sm mt-3'>Forgot your password?<Button onClick={()=>dispatch(openModal({comp: 'auth', props:{type: 'forgot'}}) )} variant='link'>Reset It</Button></p>}
      </form>

    </>
  )
}

export default AuthType