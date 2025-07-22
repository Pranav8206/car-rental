import React,{useEffect, useState} from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader'

const ManageCars = () => {
  const {isOwner, axios, currency} = useAppContext()
  const [loading, setLoading] = useState(true)

  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('/api/owner/cars')
      if (data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally {
      setLoading(false)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      setLoading(true);
      const {data} = await axios.post('/api/owner/toggle-car',{carId})
      if (data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally {
      setLoading(false)
    }
  }
  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?')

      if (!confirm) return null

      const {data} = await axios.post('/api/owner/delete-car',{carId})
      if (data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isOwner && fetchOwnerCars()
  },[isOwner])
  
  useEffect(() => {
    fetchOwnerCars()
  }, [])

  if (loading) return( 
  <div className='container mx-auto w-full'>
    <Loader />
    </div>
  )
  
  return (
    <div className='px-1 sm:px-4  pt-10 md:px-10 w-full'>
      <Title title="Manage Cars" subTitle="View all listed cars, update their details, or remove them from the booking platform" />
      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-center  text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium '>Status</th>
              <th className=' font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ?
            (cars.map((car, index)=>(
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-1 sm:p-3 text-xs sm:text-sm flex items-center justify-start gap-0 sm:gap-2'>
                  <img src={car.image} alt="image" className='h-8 w-8 sm:h-12 sm:w-12 aspect-square rounded-md object-cover ' />
                  <div className='flex flex-col items-start'>
                    <p className='font-medium max-sm:flex max-sm:flex-col  items-start'><span>{car.brand}</span> <span>{car.model}</span></p>
                    <p className='text-xs text-gray-500 max-md:hidden'> {car.seating_capacity}•{car.transmission}</p>
                  </div>
                </td>
                <td className='p-3 max-md:hidden '>{car.category}</td>
                <td className='p-1 sm:p-3 max-sm:text-xs'>{currency}{car.pricePerDay} /Days</td>
                <td className='p-1 sm:p-3 max-sm:text-xs '>
                  <span className={`px-1 sm:px-3 py-1 rounded-full text-xs ${car.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`} >
                    <span className=' max-md:hidden'>{car.isAvailable ? "Available" : "Unavailable"}</span>
                    <span className=' md:hidden'>{car.isAvailable ? "Available" : "Unavailable"}</span>
                  </span>
                </td>

                <td className='p-1 sm:p-3 flex items-center justify-center '> 
                  <img onClick={()=>toggleAvailability(car._id)} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="icon" className='cursor-pointer' />
                  <img onClick={()=>deleteCar(car._id)} src={assets.delete_icon} alt="icon" className='cursor-pointer' />
                </td>
              </tr>
            ))
            ):(
              <tr>
                  <td colSpan="5" className="text-center text-gray-400 p-5">No car found.</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
            <div  className='max-w-3xl my-3 md:hidden w-full text-center font-extralight text-xs opacity-40'> use desktop mode for full details.</div>

    </div>
  )
}

export default ManageCars
