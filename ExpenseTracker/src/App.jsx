import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import ForgotPass from "./Pages/ForgotPass";

export default function App(){
 
  const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {path:"/",element:<HomePage/>},
      {path:"/login",element:<Login/>},
      {path:"/profile",element:<ProfilePage/>},
      {path:'/forgot',element:<ForgotPass/>}
    ]
  }
  
 ])
  return(
    <RouterProvider router={router}/>
    
  )
}
