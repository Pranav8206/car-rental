import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader'

const ManageBooking = () => {

  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)


  const fetchOwnerBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/booking/owner')
      data.success ? setBookings(data.bookings || []) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }finally {
      setLoading(false)
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/booking/change-status', { bookingId, status })

      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  if (loading) return( 
    <div className='container mx-auto w-full'>
      <Loader />
      </div>
    )

  return (
    <div className='px-1 sm:px-4 pt-10 md:px-10 w-full'>
      <Title title="Manage Booking" subTitle="Track all customer bookings, approve or cancel requests, and manage booking status" />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Date Range</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium max-md:hidden'>Payment</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ?
              (bookings.map((booking, index) => (
                <tr key={index} className='border-t border-borderColor text-gray-500'>
                  <td className='p-1 sm:p-3 text-xs sm:text-sm flex items-center gap-1 sm:gap-3'>
                    <img src={booking.car.image} alt="image" className='h-12 w-12 aspect-square rounded-md object-cover' />
                    <p className='font-medium '>{booking.car.brand} {booking.car.model}</p>
                  </td>

                  <td className='p-3 max-md:hidden'>
                    {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                  </td>

                  <td className='p-3'>{currency}{booking.price}</td>

                  <td className='p-3 max-md:hidden'>
                    <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>offline</span>
                  </td>

                  <td className='p-1 text-xs sm:text-sm sm:p-3'>
                    {booking.status === 'pending' ? (
                      <select onChange={e => changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='p-0.5 sm:px-2 sm:py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-gray-500' : 'bg-red-100 text-red-500'}`}>{booking.status}</span>
                    )}
                  </td>

                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 p-5">No booking found.</td>
                </tr>
              )}
          </tbody>

        </table>
      </div>
<div  className='max-w-3xl my-3 md:hidden w-full text-center font-extralight text-xs opacity-40'> use desktop mode for full details.</div>    </div>
  )
}

export default ManageBooking
