import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { externalSignIn } from '@dokkan/api/authSlice';
import Loader from '@dokkan/components/Loader/Loader';
import { useAppDispatch } from '@dokkan/store';

function externalLogin() {
  const {query, replace} = useRouter()
  const {id, email} = query as {id: string, email: string}
  const dispatch = useAppDispatch()
  useEffect(() =>{
    dispatch(externalSignIn({id, email})).then(() => replace('/'))
  },[id, email])
  return (
    <Loader init/>
  )
}

export default externalLogin