import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <div>
      <motion.div
      initial={{y:50, opacity:0}}
    whileInView={{y:0, opacity:1}}
    transition={{duration: 0.6, delay: 0.5}}
     className='text-gray-500 px-6 md:px-12 lg:px-20 xl:px-24 mt-60 text-sm'>
            <div className='flex flex-wrap flex-row justify-between items-start gap-8 pb-4 border-borderColor'>
                <div >
                    <img src={assets.logo} alt="logo" className='h-8 md:h-9' />
                    <p className='max-w-80 mt-3'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                        </p>
                    <div className='flex items-center gap-3 mt-6'>
                        
                        <a href="mailto:/pranavmavle8206@gmail.com">
                        <img src={assets.gmail_logo} alt="gmail" className='size-5' />
                        </a>

                        
                        {/* LinkedIn */}
                        <Link to={"https://www.linkedin.com/in/pranav-mavle-917681300/"}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
                        </svg>
                        </Link>

                        <a href="/">
                        <img src={assets.twitter_logo} alt="x" className='size-5' />
                        </a>

                        <a href="/">
                        <img src={assets.facebook_logo} alt="facebook" className='size-5' />
                        </a>

                        <a href="/">
                        <img src={assets.instagram_logo} alt="ig" className='size-5' />
                        </a>
                    </div>
                </div>
                
                <div className='flex sm:w-1/2 flex-wrap flex-row justify-around items-start gap-14  border-borderColor'>
                    <div>
                        <p className='text-base font-medium  text-gray-800 uppercase'>Quick Links</p>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Browse Cars</a></li>
                            <li><a href="#">List Your Car</a></li>
                            <li><a href="/about">About Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <p className='text-base font-medium  text-gray-800 uppercase'>Resources</p>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Cancellation Option</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="/">CarRental</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <span>|</span>
                    <li><a href="#">Terms</a></li>
                    <span>|</span>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
        </motion.div>
    </div>
  )
}

export default Footer
