"use client"
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTiktok, FaLinkedin } from 'react-icons/fa6';
const Footer = () => (
    <>
        <div className='footer flex flex-col sm:flex-row bg-gray-100 mt-3 pt-3 gap-3 sm:gap-2'>
            <div className='flex flex-col sm:flex-row flex-wrap w-full'>
                <div className="footerbox m-2 sm:m-3 md:m-4 w-full sm:w-1/2 lg:w-64 overflow-hidden flex flex-col p-3 gap-2 ">
                    <ul>
                        <Link href="/About">
                            <li className='font-bold text-lg sm:text-xl p-2 sm:p-3 text-black'>About US</li>
                        </Link>
                        <Link href="/About">
                            <li className='font-semibold text-base sm:text-lg p-1 text-black'>About pizza hut</li>
                        </Link>
                        <Link href="/">
                            <li className='font-semibold text-base sm:text-lg p-1 text-black'>Pizza hut near me</li>
                        </Link>
                    </ul>
                </div>

                <div className="footerbox m-2 sm:m-3 md:m-4 w-full sm:w-1/2 lg:w-64 overflow-hidden flex flex-col p-3 gap-2 ">
                    <ul>
                        <li className='font-bold text-lg sm:text-xl p-2 sm:p-3 text-black'>Policies</li>
                        <li className='font-semibold text-base sm:text-lg p-1 cursor-pointer text-black'>Privacy center</li>
                        <li className='font-semibold text-base sm:text-lg p-1 cursor-pointer text-black'>term of uses</li>
                    </ul>
                </div>

                <div className="footerbox m-2 sm:m-3 md:m-4 w-full sm:w-1/2 lg:w-64 overflow-hidden flex flex-col p-3 gap-2 ">
                    <ul>
                        <li className='font-bold text-lg sm:text-xl p-2 sm:p-3 text-black'>Customer Services</li>
                        <li className='font-semibold text-base sm:text-lg p-1 cursor-pointer text-black'>FAQs</li>
                        <Link href="/Contact">
                            <li className='font-semibold text-base sm:text-lg p-1 cursor-pointer text-black'>Contect pizza hut</li>
                        </Link>
                    </ul>
                </div>

                <div className="footerbox m-2 sm:m-3 md:m-4 w-full sm:w-1/2 lg:w-64 flex flex-col p-3 gap-2 ">
                    <ul>
                        <li className='font-bold text-lg sm:text-xl p-2 sm:p-3 text-black'>Download Apps</li>

                        <button className='w-full mt-4 sm:mt-8 lg:mt-10 bg-gray-100 '>
                            <img src="/apple_store.webp" alt="Download on the Apple Store" className="w-full h-auto transform transition-transform duration-300 hover:scale-110" />
                        </button>

                        <button className='w-full mt-2 sm:mt-4 bg-gray-100'>
                            <img src="/android_store.webp" alt="Get it on Google Play" className="w-full h-auto transform transition-transform duration-300 hover:scale-110" />
                        </button>

                        <li className='font-bold text-lg sm:text-xl p-2 sm:p-3 text-black mt-4 sm:mt-6'>Follow Us</li>
                        <div className='flex gap-2 mt-2 sm:mt-3'>
                            <a
                                href='https://www.instagram.com/tigerstyle786?igsh=OW43N29rczRpdGJ0'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex-1 p-3  text-white rounded-lg font-extrabold transform transition-all duration-300 hover:scale-110  active:scale-95 flex items-center justify-center gap-1'
                                aria-label='Instagram'
                            >
                                <FaInstagram className='w-5 h-5 text-red-500' />

                            </a>
                            <a
                                href='https://www.facebook.com/share/17qrSHpXp8/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex-1 p-3  text-white rounded-lg font-bold transform transition-all duration-300 hover:scale-110  active:scale-95 flex items-center justify-center gap-1'
                            >
                                <FaFacebook className='w-5 h-5 text-blue-500' />

                            </a>

                            <a
                                href='https://www.tiktok.com/@tigerstyle786?_r=1&_t=ZS-96LtwZrl7Z6'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex-1 p-3  rounded-lg font-semibold transform transition-all duration-300 hover:scale-110  active:scale-95 flex items-center justify-center gap-1'
                            >
                                <FaTiktok className='w-5 h-5 text-gray-900' />

                            </a>
                            <a
                                href='https://www.linkedin.com/in/muzamal-farooq-1232693a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex-1 p-3   rounded-lg font-bold transform transition-all duration-300 hover:scale-110  active:scale-95 flex items-center justify-center gap-1'
                            >
                                <FaLinkedin className='w-5 h-5 text-blue-500' />

                            </a>
                        </div>
                    </ul>

                </div>


            </div>


        </div>
        <div className='bg-gray-100 pb-9'>
            <div className='font-bold text-lg text-black'>© 2026 Pizza Hut (Pty) Limited. All rights reserved</div>
        </div>


    </>


)

export default Footer