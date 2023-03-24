// import { ErrorBoundary } from "react-error-boundary";

import { PropsWithChildren } from 'react';

import { TabProvider } from './useTabs';

const Tabs = (props:PropsWithChildren<{activeTab?: number}>) => {
  return ( 
    
      <TabProvider activeTab={props.activeTab}>
        <div {...props}/>
      </TabProvider>
   );
}

// function ErrorFallback({error, resetErrorBoundary}) {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   )
// }
export default Tabs;