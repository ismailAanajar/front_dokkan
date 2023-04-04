import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { openModal } from '@dokkan/api/modalSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const dispatch = useAppDispatch()
    const {push, asPath} = useRouter()
    const token = useAppSelector(state => state.auth.token)

    useEffect(() => {
      if (!token) {
        push('/')
        dispatch(openModal({comp: 'auth', props:{type: 'login', from: asPath}}))
      }
    }, [token]);

    return !token ? <div className="min-h-screen" /> : <Component />;
  };

  return AuthenticatedComponent;
};

export default withAuth