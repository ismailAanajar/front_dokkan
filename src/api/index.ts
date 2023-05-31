import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export { default as user } from './userSlice';
export { default as modal } from './modalSlice';
export { default as auth } from './authSlice';
export { default as review } from './reviewSlice';
export { default as app } from './appSlice';
export { default as address } from './addressSlice';
export { default as product } from './productSlice';

// prettier-ignore

// prettier-ignore





const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
// customAxios.defaults.withCredentials = true;
// customAxios.defaults.withCredentials = false;
customAxios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = 'Bearer ' +  localStorage?.getItem('token');
    // config.headers['Access-Control-Allow-Credentials'] = '*';
    // config.headers['X-API-KEY'] = process.env.API_KEY;
    return config;
  },
  function (error) {
    return Promise.reject(error);
    
  },
  );
  
  customAxios.interceptors.response.use(
    function (response) {
    return response;
  },
  function (error) {
    
    return Promise.reject(error);
  },
  );
  
  // Function that will be called to refresh authorization
  const refreshAuthLogic = (failedRequest:any) =>{
    
      return  Promise.resolve();
  };


// Instantiate the interceptor
createAuthRefreshInterceptor(customAxios, refreshAuthLogic);

export default customAxios;