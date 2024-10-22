import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import Home from "./Pages/Home";
import './App.css'
import Moviepage from "./components/Moviepage";

export default function App(){
 
  const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/moviepage",element:<Moviepage/>},
    ]
  }
  
 ])
  return(
    <RouterProvider router={router}/>
    
  )
}
