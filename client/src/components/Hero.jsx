import React, {useState} from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

const Hero = () => {

  const [pickupLocation, setPickupLocation] = useState("")

  const {navigate, pickupDate, setPickupDate, returnDate, setReturnDate} = useAppContext() 

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/cars?pickupLocation=' + pickupLocation )
  }

  return (
    <motion.div
    initial={{y:50, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration: 0.6}}
    className='h-fit min-h-screen max-md:pt-7 flex flex-col items-center justify-center gap-14 bg-light text-center'>
      
      <motion.h1 initial={{ opacity:0}}
    animate={{opacity:1}}
    transition={{duration: 0.6, delay: 0.2}}
     className='text-4xl md:text-5xl font-semibold'>Luxury Cars on Rent!</motion.h1>

      <motion.form 
      initial={{scale: 0.95, opacity:0, y:50}}
    animate={{scale: 1, opacity:1, y:0}}
    transition={{duration: 0.6, delay: 0.4}}
      onSubmit={handleSearch} action="" className='flex flex-col md:flex-row  items-center justify-between p-4 rounded-lg md:rounded-full w-full max-sm:max-w-60 max-w-80
      md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.2)]'>

        <div className='flex flex-col md:flex-row items-center gap-6 min-md:ml-8'>
          <div className='flex flex-col items-start '>
            <select required value={pickupLocation} onChange={(e)=>{setPickupLocation(e.target.value)}
            }>
              <option value="">Pickup Location</option>
              {cityList.map((city, index)=>
                <option key={index} value={city} >{city}</option>
              )}
            </select>
            <p className=' px-1 text-sm text-gray-500'>{pickupLocation ? pickupLocation : "Please select location"}</p>
          </div>
          <div className='flex flex-col items-start gap-1 '>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id='pickup-date' min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500 ' required />
          </div>

          <div className='flex flex-col items-start gap-1'>
            <label htmlFor="return-date">Return Date</label>
            <input value={returnDate} onChange={e=>setReturnDate(e.target.value)}  type="date" id='return-date' min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
          </div>

        </div>
        
        <button className='flex items-center justify-center gap-1 px-5 md:px-9 py-2 md:py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer w-34'>
          <img src={assets.search_icon} alt="search" className='brightness-200 h-7' />
          Search
          </button>
      </motion.form>

      <motion.img
      initial={{y:50, x:-50, opacity:0}}
    animate={{y:0,x:0, opacity:1}}
    transition={{duration: 0.8, delay: 0.2}}
      src={assets.main_car} alt="car" className='max-h-72' />
    </motion.div>
  )
}

export default Hero
