import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import Message from "./components/Message";

export default function App(){
 
  const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {path:"/",element:<HomePage/>},
      {path:"/login",element:<Login/>},
      {path:"/message",element:<Message/>}
    ]
  }
  
 ])
  return(
    <RouterProvider router={router}/>
    
  )
}
