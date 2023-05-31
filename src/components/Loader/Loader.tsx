import classNames from 'classnames';

import { Icons } from '@dokkan/assets/icons';

type Props = {
  button?: boolean;
  init?: boolean; 
  full?: boolean;
  loading?: boolean;  
  primary?: boolean
}

function Loader({button, init, full, loading, primary}:Props) {
  return (
  ( loading === undefined || loading) ? <div className={classNames('text-center flex justify-center items-center',{
      'fixed top-0 left-0 w-full h-full  z-[99999] bg-white': init
    })}>
      <Icons.Spinner className={classNames('[ animate-spin', {'w-16 h-16 [&>path:nth-child(2)]:stroke-primary': init, '[&>path:nth-child(2)]:stroke-primary w-20 h-20': full, '[&>path:nth-child(2)]:stroke-white': !full && !init, '[&>path:nth-child(2)]:stroke-primary': primary })}/>
    </div> : <div className="hidden"></div>
  )
}

export default Loader