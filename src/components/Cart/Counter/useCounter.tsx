import {
  createContext,
  useContext,
} from 'react';

// const init = {
//   count: 0,
//   increment: () => {},
//   decrement: () => {},
// } 

const CounterContext = createContext(null);


const CounterProvider = (props:any) => {
 
  return <CounterContext.Provider value={props}  {...props}/>
}

const useCounter = () => {
  const context = useContext(CounterContext);
  if(!context) throw new Error ('useCounter must used inside CounterProvider')
  return context;
}

export { CounterProvider, useCounter };