import React from 'react';

import Link from 'next/link';

import { Icons } from '@dokkan/assets/icons';

import Button from '../Button';
import Logo from '../Logo';

const socialIcons = {
  facebook: <Icons.Facebook/>,
  instagram: <Icons.Instagram/>,
  twitter: <Icons.Twitter/>,
  youtube: <Icons.Youtube/>,
}
const social = {
  facebook: {
    visible: true,
    url: '#'
  },
  twitter: {
    visible: true,
    url: '#'
  },
  instagram: {
    visible: true,
    url: '#'
  },
  youtube: {
    visible: true,
    url: '#'
  },
}
const links = [
  {
    heading: 'logo',
    text: 'The home and elements needed to create beautiful products.'
    
  },
  {
    heading: 'company',
    links: {
      'About us': '#',
      'Careers': '#',
      'Store Locations': '#',
      'Our Blog': '#',
      'Reviews': '#'
    }    
  },
  {
    heading: 'Shop',
    links: {
      'Game & Video': '#',
      'Phone &Tablets': '#',
      'Computers & Laptop': '#',
      'Sport Watches': '#',
      'Discounts': '#'
    }    
  },
  {
    heading: 'Support',
    links: {
      'FAQs': '#',
      'Reviews': '#',
      'Contact Us': '#',
      'Shipping': '#',
      'Returns': '#'
    }    
  },
  {
    heading: 'Talk to us',
    links: {
      'phone': +564846542,
      'email': 'support@dokkan.com'
    }    
  },
]

const Footer = () => {

  return (
    <div>
      <div className="news_letter bg-primary ">
        <div className="container  md:flex justify-between py-9 gap-10">
          <div>
            <h3 className='font-bold capitalize text-white text-4xl'>join our newsletter now</h3>
            <p className='text-white'>Register now to get updates on promotions.</p>
          </div>
          <div className='flex p-2 bg-white flex-grow mt-3 md:mt-0'>
            <input className='flex-grow outline-none' type="email" name="email" placeholder='Your email address' />
            <Button variant='secondary'>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="py-9 container grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {
          links.map((item:any) => {
            if (item.heading === 'logo') {
              return <div>
                  <Logo href='/'/>
                  <p className='text-sm py-3 pl-2 text-gray'>{item.text}</p>
                  <div className='flex gap-4'>
                    {
                      Object.keys(social).map(key => {
                        return <a className='text-gray' href={social[key as keyof typeof social].url}>
                          {socialIcons[key as keyof typeof socialIcons]}
                        </a>
                      })
                    }
                  </div>
               </div> 
            }
            return <div>
              <h3 className='font-bold mb-2'>{item.heading}</h3>
              {
                Object.keys(item.links).map((key:any) => {
                  
                  return <Link className='block text text-gray' href   ={`${item.links[key]}`}>{key}</Link>
                })
              }
            </div>
           }
          ) 
        }
      </div>
    </div>
  )
}

export default Footer