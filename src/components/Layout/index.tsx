import {
  PropsWithChildren,
  useState,
} from 'react';

import Loader from '../Loader/Loader';

const Layout = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {isLoading && <Loader init />}
      <div>{children}</div>
    </div>
  );
};

export default Layout;