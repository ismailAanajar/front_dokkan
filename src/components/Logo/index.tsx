import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  href?: string
}

function Logo({href}:LogoProps) {
  const img = <Image src={require('@dokkan/assets/images/logo.png')} width={150} height={50} alt='logo'/>
  if (href) {
    return (
      <Link href={href}>
        {img}
      </Link>
    )
  }
  return (
    <div>
      {img}
    </div>
  )
}

export default Logo