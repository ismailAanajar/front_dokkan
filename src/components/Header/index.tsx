import React, { useState } from 'react';

import { Icons } from '@dokkan/assets/icons';

import Logo from '../Logo';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div>
            <div>
                <div className="relative">
                    {/* For large screens */}
                    <div className="py-3">
                        <div className="container mx-auto flex items-center justify-between">
                            <Logo href='/'/>
                            <ul className="hidden w-8/12 md:flex items-center justify-center space-x-8">
                                <li>
                                    <a href="javascript:void(0)" className="font-sans text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className=" text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        Shop
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className=" text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className=" text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        Contact us
                                    </a>
                                </li>
                            </ul>
                            <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">
                                <div className="hidden md:flex items-center space-x-4 xl:space-x-8">
                                    <button aria-label="view profile" className=" relative text-gray-800  focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        <Icons.User/>
                                    </button>
                                    <button aria-label="view favourites" className="relative text-gray-800  focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        <Icons.WhishList/>
                                        <span className='absolute -top-2 -right-1 w-[18px] h-[18px] bg-primary text-xs rounded-full flex justify-center items-center text-white'>0</span>
                                    </button>
                                    <button aria-label="go to cart" className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 relative">
                                        <Icons.Cart/>
                                        <span className='absolute -top-2 -right-1 w-[18px] h-[18px] bg-primary text-xs rounded-full flex justify-center items-center text-white'>0</span>
                                    </button>
                                </div>
                                <div className="flex lg:hidden">
                                    <button aria-label="open menu" onClick={() => setShowMenu(true)} className="text-black  md:hidden focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                        <Icons.OpenMenu/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* For small screen */}
                    <div id="mobile-menu" className={`${showMenu ? "flex" : "hidden"} absolute  z-10 inset-0 md:hidden bg-white flex-col h-screen w-full`}>
                        <div className="flex items-center justify-between border-b border-gray-200  pb-4 p-4">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <svg className="fill-stroke text-gray " width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18.9984 18.9999L14.6484 14.6499" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="Search for products" className="text-sm  text-gray placeholder-gray-600  focus:outline-none" />
                            </div>
                            <button onClick={() => setShowMenu(false)} aria-label="close menu" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                <Icons.CloseMenu/>
                            </button>
                        </div>
                        <div className="mt-6 p-4">
                            <ul className="flex flex-col space-y-6">
                                <li>
                                    <a href="javascript:void(0)" className=" flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        Home
                                        {/* <div>
                                            <svg className="fill-stroke text-black " width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div> */}
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className=" flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        Shop
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className=" flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className=" flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        Contact us
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="h-full flex items-end">
                            <ul className="flex flex-col space-y-8 bg-gray-50 w-full py-10 p-4 ">
                                <li>
                                    <a href='#'  className="relative  text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        <Icons.User/>
                                         <p className="text-base">Profile</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="relative  text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        <div>
                                            <Icons.Cart/>
                                        </div>
                                        <p className="text-base">Cart</p>
                                        <span className='absolute right-0 w-[20px] h-[20px] bg-primary text-xs rounded-full flex justify-center items-center text-white'>0</span>

                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="relative text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        <div>
                                            <Icons.WhishList/>
                                        </div>
                                        <span className='absolute right-0 w-[20px] h-[20px] bg-primary text-xs rounded-full flex justify-center items-center text-white'>0</span>

                                        <p className="text-base">Wishlist</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
