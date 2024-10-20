import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import Home from "./Pages/Home";
import './App.css'

export default function App(){
 
  const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {path:"/",element:<Home/>},
    ]
  }
  
 ])
  return(
    <RouterProvider router={router}/>
    
  )
}
