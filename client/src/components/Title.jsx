import React from 'react'
import { motion } from 'motion/react'

const Title = ({title, subTitle, align}) => {
  return (
    <motion.div 
    initial={{y:50, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration: 0.6}} className={`flex flex-col justify-center items-center text-center ${align == "left" && "md:items-start md:text-left "}`}>
      <h1 className='font-semibold text-4xl md:text-[40px]'>{title}</h1>
      <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-156'>{subTitle}</p>
    </motion.div>
  )
}

export default Title
