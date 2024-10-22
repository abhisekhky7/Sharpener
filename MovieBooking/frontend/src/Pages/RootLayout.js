import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Carausel from '../components/Carausel'
import Footer from '../components/Footer'

export default function RootLayout() {
  return (
    <div>
      <div>
          <Header/>
      </div>
      <Outlet/>
     <div className='mt-5'> <Footer/></div>
    </div>
  )
}
