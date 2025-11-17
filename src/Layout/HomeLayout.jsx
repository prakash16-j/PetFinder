import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Component/Footer'

const HomeLayout = () => {
  return (
    <div>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default HomeLayout
