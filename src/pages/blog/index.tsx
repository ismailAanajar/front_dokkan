import React from 'react';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import { subString } from '@dokkan/utils';

function Blog({data}:{data: any}) {
  
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100">
	<div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
		<Link  href={'/blog/'+data.at(-1).slug} className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
			<div className="relative w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500">
        <Image src={data.at(-1).image_url} fill alt="" className="object-cover " />
      </div>
			<div className="p-6 space-y-2 lg:col-span-5">
				<h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">{data.at(-1).title}</h3>
				<span className="text-xs dark:text-gray-400">{new Intl.DateTimeFormat("en-US").format(new Date(data.at(-1).created_at))}</span>
				<p>{data.at(-1).short_description}</p>
			</div>
		</Link>
		<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{
				data?.map((post:any) => (
					<Link href={'/blog/'+post.slug} className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900">
						<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src={post.image_url} />
						<div className="p-6 space-y-2">
							<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">{post.title}</h3>
							<span className="text-xs dark:text-gray-400">{new Intl.DateTimeFormat("en-US").format(new Date(post.created_at))}</span>
							<p>{subString(post.short_description, 50)}</p>
						</div>
					</Link>
				))
			}
		</div>
		<div className="flex justify-center">
			<button type="button" className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400">Load more posts...</button>
		</div>
	</div>
</section>
  )
}


//@ts-ignore
export const getServerSideProps = async context => {
  // const {dispatch} = store 
  // const cms = await axios.get('http://localhost:8000/api/v1/cms/about');
  const resp = await axios.get('http://localhost:8000/api/v1/blog');
  return {
    props: {
      data: resp.data
    }
  }
} 

export default Blog