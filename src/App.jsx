import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

import './bootstrap.min.css'

import Admin from './pages/Admin'
import User from './pages/User'
import Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './Components/Footer'
import Landing from './pages/Landing'
import { adminAuthorisedContext, authorisationContext } from './Contextapi/ContextApi'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify'
import Payment from './pages/Payment'
import AdminProfile from './pages/AdminProfile'




function App() {
   const{isAuthorisation}=useContext(authorisationContext) 
   const {isAdmin}=useContext(adminAuthorisedContext)
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Landing insideLanding={true}/>} />
      <Route path='/home' element={<Home insideHome={true}/>} />
      <Route path='/login' element={<Login insideLogin={true}/>}/>
      <Route path='/register' element={<Register insideRegister={true}/>}/>
      <Route path='/admin' element={isAdmin&&<Admin/>} />

      <Route path='/user' element={<User/>} />
      {/* <Route path='/user' element={isAuthorisation&&<User/>} /> */}
      <Route path='/product/:productid' element={<Product/>} />
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payment' element={<Payment/>}/>
       {/* <Route path='/adminprofile' element={isAdmin&&<AdminProfile/>} /> */}
    </Routes>
    <Footer insideAdmin={true}/>

    <ToastContainer position='top-right' />
     
    </>
  )
}

export default App
