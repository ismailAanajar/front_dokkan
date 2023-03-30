import { useEffect } from 'react';

import { openModal } from '@dokkan/api/modalSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@dokkan/store';

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.auth.token)

    useEffect(() => {
      if (!token) {
        dispatch(openModal({comp: 'auth', props:{type: 'login'}}))
      }
    }, [token]);

    return !token ? <div className="min-h-screen" /> : <Component />;
  };

  return AuthenticatedComponent;
};

export default withAuth