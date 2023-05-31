import { useEffect } from 'react';

import axios from 'axios';
import parse from 'html-react-parser';

import Css from '@dokkan/components/Editor/Css';
import Js from '@dokkan/components/Editor/Js';

function About({cms}:any) {
  console.log(cms);
  
  useEffect(() => {
    console.log('testffffffffffffffffffff');
  },[])
  
  return (
     <div className='flex flex-wrap gap-3 container my-8'>
        
          {
            cms.map((item:any) => {
              
              switch (item.name) {
                case 'link_image':
                case 'text_image':
                  return '<Offer {...item}/>'
                case 'custom_html':
                  
                  return (
                    <div className="" style={{ width: item.width + '%' }}>
                      {parse(item.html)}
                    </div>
                  )
              
                case 'code_editor':
                  
                  return <div className="w-full" > 
                      <Js htmlString={item.js}/>
                      {<Css cssString={item.css}/>}
                      {parse(item.html)}
                    </div>
                  break;
              }
            })
          }
        </div>
  )
}



//@ts-ignore
export const getServerSideProps = async args => {
  // const {dispatch} = store 
  const resp = await axios.get('http://localhost:8000/api/v1/cms/about');
  return {
    props: {
      cms: resp.data
    }
  }
} 

export default About 