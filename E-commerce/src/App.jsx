import React from "react";
import Header from "./components/Header";
import DisplayProduct from "./components/DisplayProduct";
import Cart from "./components/Cart";
import Footer from './components/Footer'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Store from "./pages/Store";
import RootLayout from "./pages/RootLayout";
import ProductDetail from "./pages/ProductDetail";
import Login from "./components/Login";
export default function App(){

 const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {path:"/",element:<HomePage/>},
      {path:"/store",element:<Store/>},
      {path:"/about",element:<About/>},
      {path:"/productDetail",element:<ProductDetail/>},
      {path:"/productDetail/:detail",element:<ProductDetail/>},
      {path:"/login",element:<Login/>},


    ]
  }
  
 ])

  return(

    <RouterProvider router={router}>
    </RouterProvider>
  )
}
