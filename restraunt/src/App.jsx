import React from "react";
import Header from './components/Layout/Header'
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

export default function App(){

  return(
    <div>
      <Cart/>
      <Header/>
      <main>
        <Meals/>
      </main>
    </div>
  )
}
