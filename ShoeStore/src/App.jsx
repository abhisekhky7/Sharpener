import React, { useEffect, useState } from "react";
import AddProduct from "./components/AddProduct";
import DisplayProduct from "./components/DisplayProduct";
import Context from "./store/context-provider";
import Bill from "./components/Bill";
import './App.css'

export default function App(){
const [product,setProduct] = useState([]);
const [cart,setCart] = useState([]);



const addCart = (product,size)=>{
  setCart((prev)=>{
    const existingItem = prev.find((item)=>item.id===product.id)
    if(existingItem){
      return prev.map((item)=>
      item.id ===product.id ? 
      {...item,quantity:item.quantity+1,total:item.total+(+item.price),count:item.count+1}
      :{...item,count:item.count+1}
    )
    }else{
      return [...prev,{...product,quantity:1}];
    }
  })
}



const cartValue={
item:cart,
addCart,
}

  return(
    <Context.Provider value={cartValue}>
      <AddProduct setProduct={setProduct}/>
    <div className="display">  <DisplayProduct setProduct={setProduct} product={product}/></div>
      <Bill/>
    </Context.Provider>
  )
}
