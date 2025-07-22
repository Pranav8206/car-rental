import React, {useEffect, useState} from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const Cars = () => {

  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')
  
  const {cars, axios} = useAppContext()
  const [input, setInput] = useState('')

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = async () => {
    if (input === ''){
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmission.toLowerCase().includes(input.toLowerCase())
      || car.location.toLowerCase().includes(input.toLowerCase())
      || car.fuel_type.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailability = async () => {
    try {
      const {data} = await axios.post('/api/booking/check-availability',{
        location: pickupLocation, pickupDate, returnDate})
      if (data.success){
        setFilteredCars(data.availableCars || [])
        if (data.availableCars.length === 0) {
          toast('No cars available for the selected dates/location')
        }
      }
    } catch (error) {
      toast.error('Failed to fetch availability');
    }
  }

  useEffect(()=>{
    isSearchData && searchCarAvailability()
  },[])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  
  }, [input, cars])
  
  return (
    <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
      <div className='w-auto'>
        <Title title="Available Cars" subTitle="Browse our selection of premium vehicles available for your next adventure." />
        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="search" className='w-4 h-4 mr-2'/>
          
          <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Search by name, model, or features' className='w-full h-full outline-none text-gray-500'/>
          
          <img src={assets.filter_icon} alt="filter" className='w-4 h-4 ml-2'/>
        </div>
      </div>

      <p className='px-3 md:px-16 lg:px-24 xl:px-32  w-full ml-4 mt-5'>Cars Available : {filteredCars.length}</p>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10 text-left'>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
            {filteredCars.map((car, index)=>(
              <div key={index}>
                <CarCard car={car}/>
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default Cars
