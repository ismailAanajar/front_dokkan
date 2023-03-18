import { PropsWithChildren } from 'react';

import classNames from 'classnames';

import { useCounter } from './useCounter';

const Decrement = ({children}: PropsWithChildren) => {
  const {decrement, count} = useCounter();
  return ( 
    <button className={classNames('p-1 rounded-full border border-gray bg-gray [&>svg>path]:fill-secondary cursor-default', {' !border-primary_light hover:!bg-primary !bg-[rgba(0,0,0,0)] [&>svg>path]:hover:!fill-white  [&>svg>path]:!fill-primary !cursor-pointer': count !== 1})} onClick={decrement}>{children}</button>
   );
}
 
export default Decrement;