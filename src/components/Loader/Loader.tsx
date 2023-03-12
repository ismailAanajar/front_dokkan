import classNames from 'classnames';

import { Icons } from '@dokkan/assets/icons';

type Props = {
  button?: boolean;
  init?: boolean
}

function Loader({button, init}:Props) {
  return (
    <div className={classNames({
      'fixed top-0 left-0 w-full h-full flex justify-center items-center z-20': init
    })}>
      <Icons.Spinner className={classNames('[&>path:nth-child(2)]:stroke-white animate-spin', {'w-16 h-16 [&>path:nth-child(2)]:stroke-primary': init})}/>
    </div>
  )
}

export default Loader