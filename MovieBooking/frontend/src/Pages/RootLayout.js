import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Carausel from '../components/Carausel'

export default function RootLayout() {
  return (
    <div>
      <div>
          <Header/>
      </div>
      <Outlet/>
    </div>
  )
}
