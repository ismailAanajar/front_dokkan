import Link from 'next/link';

type CategoryProps = {
  img: string
}

function Category({img}:CategoryProps) {
  return (
    <Link href={'#'}>
      <img className='w-full' src={img} alt="" />
    </Link>
  )
}

export default Category