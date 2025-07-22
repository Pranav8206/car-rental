import React from 'react'
import { assets, menuLinks } from '../assets/assets'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'


const Navbar = () => {
  const {setShowLogin, user, logout, isOwner, axios, setIsOwner} =
  useAppContext()


  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const changeRole = async () => {
    try {
      const {data} = await axios.post('/api/owner/change-role')

      if (data.success){
        setIsOwner(true)
        toast.success(data.message)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)      
    }
  }
  return (
    <motion.div
    initial={{x:-20, opacity:0}}
    animate={{x:0, opacity:1}}
    transition={{duration: 0.5, delay: 0.2}}
    className={`flex items-center justify-between px-5 md:px-14 lg:px-20 xl:px-28 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" && "bg-light"}`} >
      <Link to="/" >
        <motion.img whileHover={{scale: 0.95}} src={assets.logo} alt="logo" className='h-8' />
      </Link>

      <div className={ `max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light": "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}` }>
        {menuLinks.map((Links, index)=> {
          return (<Link key={index} to={Links.path} onClick={()=>setOpen(!open)}>
            {Links.name}
          </Link>)
        })}
      

        <div onClick={()=>{navigate(`/cars`)}} className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56 '>
          <input type="text" className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500' placeholder='search cars'/>
          <img src={assets.search_icon} alt="search" />
        </div>

        <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
          <button onClick={()=>{isOwner ? navigate('/owner') : changeRole()}} className='cursor-pointer'>{isOwner ? 'Dashboard': 'Add cars'}</button>

          <button onClick={()=>{user?logout() : setShowLogin(true)}} className='cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg '>{user ? 'Logout' : 'Login'}</button>
        </div>
      
      </div>

      <button className='sm:hidden cursor-pointer transition-all duration-100' aria-label='menu' onClick={()=>{setOpen(!open)}}>
        <img src={open ?assets.close_icon : assets.menu_icon} alt="" />
      </button>
    </motion.div>
  )
}

export default Navbar
