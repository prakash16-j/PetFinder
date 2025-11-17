import { useState } from 'react'
import Navbar from './Component/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Component/Footer'


function App() {


  return (
    <>
     <Navbar/>
   <div className="pt-22">
  <Outlet />
</div>
     
    </>
  )
}

export default App
