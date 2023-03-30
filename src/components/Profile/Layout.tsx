import { PropsWithChildren } from 'react';

function layout({children, title}: PropsWithChildren<{title?: string}>) {
  return (
    <div>
      {title && <h2 className="font-bold text-3xl mb-3">{title}</h2>}
      {children}
    </div>
  )
}

export default layout