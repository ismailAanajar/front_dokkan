import {
  Children,
  PropsWithChildren,
} from 'react';

import classNames from 'classnames';

import { CounterProvider } from './useCounter';

type Props = PropsWithChildren<{count: number, increment: () => void, decrement: () => void, className?: string }>
const Counter = ({children,count, increment, decrement, className}: Props) => {
  const childs = Children.map(children, (child:any) => {
    return typeof child?.type === 'string' ? null : child;
  }) 
  return ( 
    <div className={classNames(className)}><CounterProvider value={{ count, increment, decrement }} >                                                                                                           {childs}</CounterProvider></div>
   )
}
 
export default Counter;