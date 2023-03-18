import {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-body_bg scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray  overflow-y-scroll'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
