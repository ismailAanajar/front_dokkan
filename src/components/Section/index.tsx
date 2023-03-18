import { PropsWithChildren } from 'react';

import Heading from './Heading';
import SubHeading from './SubHeading';

function Section({children}:PropsWithChildren) {
  return (
    <div className="py-16">
      <div className="container">
        {children}
      </div>
    </div>
  )
}

Section.Heading = Heading;
Section.SubHeading = SubHeading;

export default Section