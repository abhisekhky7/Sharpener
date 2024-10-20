import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import Login from "./Pages/Login";
import Dashboard from "./components/Dashboard";

export default function App(){
 
  const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {path:"/",element:<Login/>},
      {path:"/dashboard",element:<Dashboard/>},
    ]
  }
  
 ])
  return(
    <RouterProvider router={router}/>
    
  )
}
