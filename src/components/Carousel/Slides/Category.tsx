import Link from 'next/link';

type CategoryProps = {
  image: string;
  title: string
}

function Category({image, title}:CategoryProps) {
  return (
    <Link href={'#'} className='text-center block'>
      <img className='w-full' src={image}  alt="" />
      <span>{title}</span>
    </Link>
  )
}

export default Category