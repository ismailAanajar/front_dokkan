import { useCounter } from './useCounter';

const Count = (props:any) => {
  const {count} = useCounter()
  return ( 
    <div {...props} className='flex justify-center items-center'>{count}</div>
   );
}
 
export default Count;