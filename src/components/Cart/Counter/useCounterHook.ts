import { useState } from 'react';

const useCounterHook = ({initialValue=0, min=-Infinity, max=Infinity, step=1}) => {
  const [count, setCount] = useState(initialValue)
  const increment = () => {
    setCount(prev => Math.min(max, prev + step));
  }
  const decrement = () => {
    setCount(prev => Math.max(min, prev - step))
  }

  return {
    count,
    increment,
    decrement
  }
}

export { useCounterHook };