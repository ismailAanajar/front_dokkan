import {
  Children,
  PropsWithChildren,
} from 'react';

import { CounterProvider } from './useCounter';

type Props = PropsWithChildren<{count: number, increment: () => void, decrement: () => void }>
const Counter = ({children,count, increment, decrement}: Props) => {
  const childs = Children.map(children, (child:any) => {
    return typeof child?.type === 'string' ? null : child;
  }) 
  return ( 
    <div><CounterProvider value={{ count, increment, decrement }} >                                                                                                           {childs}</CounterProvider></div>
   )
}
 
export default Counter;