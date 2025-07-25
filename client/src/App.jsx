import React, {useState} from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarsDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/Owner/Layout'
import Dashboard from './pages/Owner/Dashboard'
import AddCar from './pages/Owner/AddCar'
import ManageCars from './pages/Owner/ManageCars'
import ManageBooking from './pages/Owner/ManageBooking'
import Login from './components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'


const App = () => {

  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
    <Toaster/>
      {showLogin && <Login/>}
      {!isOwnerPath&& <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/car-details/:id' element={<CarDetails/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        
        <Route path='/owner' element={<Layout/>}>
          
          <Route index  element={ <Dashboard/> } />
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='manage-cars' element={<ManageCars/>}/>
          <Route path='manage-bookings' element={<ManageBooking/>}/>

        </Route>
      </Routes>



      {!isOwnerPath && <Footer/>}
      
    </>
  )
}

export default App
