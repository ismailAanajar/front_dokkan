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
    const id = useAppSelector(state => state.user.userInfo.id)

    useEffect(() => {
      if (!id) {
        push('/')
        dispatch(openModal({comp: 'auth', props:{type: 'login', from: asPath}}))
      }
    }, [id]);

    return !id ? <div className="min-h-screen" /> : <Component />;
  };

  return AuthenticatedComponent;
};

export default withAuth