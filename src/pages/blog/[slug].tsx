import React from 'react';

import axios from 'axios';
import parse from 'html-react-parser';

function Post({post}:{post:any}) {
  console.log({post});
  
  return (
    <div className='container'>
      <section className="relative">
        <div className='flex py-8 px-5 justify-center items-center text-4xl font-bold my-5 text-white bg-gradient-to-r from-primary to-primary_light '>
          {post.title}
        </div>
      </section>
      <section>
        {
       parse( post.blog)
      }
      </section>
    </div>
  )
}

//@ts-ignore
export const getServerSideProps = async context => {
  // const {dispatch} = store 
  // const cms = await axios.get('http://localhost:8000/api/v1/cms/about');
  const resp = await axios.get('http://localhost:8000/api/v1/blog/'+context.query.slug);
  return {
    props: {
      post: resp.data
    }
  }
} 

export default Post 