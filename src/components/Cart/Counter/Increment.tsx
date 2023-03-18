import { PropsWithChildren } from 'react';

import classNames from 'classnames';

import { useCounter } from './useCounter';

const Increment = ({children}: PropsWithChildren) => {
  const {increment} = useCounter()
  return ( 
    <button className={classNames('p-1 border border-primary_light rounded-full hover:bg-primary [&>svg>path]:hover:fill-white [&>svg>path]:fill-primary')} onClick={increment}>{children}</button>
   );
}
 
export default Increment;