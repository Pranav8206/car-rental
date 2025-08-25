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
                    <div className='flex items-center gap-3 mt-6 '>
                        
                        

                        
                        {/* LinkedIn */}
                        <Link to={"https://www.linkedin.com/in/pranav-mavle-917681300/"}>
                        <div className='hover:text-primary'>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
                        </svg>
                        </div>
                        </Link>
                        
                        {/*Github */}
                        <Link to={"https://www.github.com/Pranav8206"}>
                        <div className='hover:text-primary'>
                        <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z">
                            </path>
                        </svg>
                        </div>
                        </Link>


                        {/* Gmail */}
                        <Link to={"mailto:/pranavmavle8206@gmail.com"}>
                        <div className='hover:text-primary'>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 50 50">
                            <path d="M 5.5 7 C 3.019531 7 1 9.019531 1 11.5 L 1 11.925781 L 25 29 L 49 11.925781 L 49 11.5 C 49 9.019531 46.980469 7 44.5 7 Z M 6.351563 9 L 43.644531 9 L 25 22 Z M 1 14.027344 L 1 38.5 C 1 40.980469 3.019531 43 5.5 43 L 44.5 43 C 46.980469 43 49 40.980469 49 38.5 L 49 14.027344 L 43 18.296875 L 43 41 L 7 41 L 7 18.296875 Z"></path>
                        </svg>
                        </div>
                        </Link>
                    </div>
                </div>
                
                <div className='flex sm:w-1/2 flex-wrap flex-row justify-around items-start gap-14  border-borderColor'>
                    <div>
                        <p className='text-base font-medium  text-gray-800 uppercase'>Quick Links</p>
                        <ul className='mt-3 flex flex-col gap-2 text-sm'>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/cars">Browse Cars</Link>
                            </li>
                            <li>
                                <Link to="/owner/add-car">List Your Car</Link>
                            </li>
                            <li>
                                <Link to="/">About Us</Link>
                            </li>
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
