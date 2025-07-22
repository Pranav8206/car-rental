import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'


const FeaturedSection = () => {
    const navigate = useNavigate()
    const {cars} = useAppContext()

  return (
    <motion.div
    initial={{y:40, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration: 1, ease: "easeOut"}}
    className='flex flex-col  items-center py-10 px-6 md:px-16 lg:px-24 xl:px-32'>
        <motion.div
    initial={{y:20, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration: 1, delay: 0.5}}>
            <Title title='Featured Vehicles' subTitle='Explore our selection of premium vehicles available for your next adventure.' />

        </motion.div> 

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
            {
                cars.slice(0,6).map((car)=>(
                   <div key={car._id}>
                        <CarCard car={car}/>
                   </div> 
                ))
            }

        </div>

        <button onClick={()=>{
            navigate('/cars');
            scrollTo(0,0)
        }}
         className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-16 cursor-pointer'>
            Explore all Cars <img src={assets.arrow_icon} alt="arrow" />
        </button>
    </motion.div>
  )
}

export default FeaturedSection
