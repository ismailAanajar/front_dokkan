import { z } from 'zod';

import { Field } from '../api/types';

type Error = {
  error: any;
  setError: any
}

export const errorHandling = ({error, setError}:Error) => {
  let focused = false;
        Object.keys(error.errors).forEach((key) => {
          setError(
            key as any,
            { message: error.errors[key][0] },
            { shouldFocus: !focused }
          );

          if (!focused) {
            focused = true;
          }
        });
}

export const rules = (fields : Field[]) => {
  
  return fields.reduce((acc:any,curr:Field) => {
    if (curr.type === 'text' || curr.type === 'password') {
      acc[curr.name] = curr.require ?  z.string().min(3) : z.string().optional()
    }
    else if (curr.type === 'number') {
      // @ts-ignore
      acc[curr.name] = curr.require ?  z.string().transform( (value) => parseInt(value, 10)) : z.number().optional()
    }
    else if  (curr.type === 'email') {
      acc[curr.name] = curr.require ?  z.string().email() : z.string().email().optional()
    }
    else if  (curr.type === 'select') {
      acc[curr.name] = z.object({
        value: curr.require ?  z.string() : z.string().optional(),
        label: curr.require ?  z.string() : z.string().optional(),
      })
    }
    return acc;
    
  },{})
}

export const resetForm = (fields: Field[]) => {
  return fields.reduce((acc:any, curr:any) => {
      acc[curr.name] = curr?.value || ''
      return acc
     },{});
}

export const subString = (string: string, length: number) => {
  if (string.length <= length) {
    return string;
  }
  return string.substring(length) + '...'
} 