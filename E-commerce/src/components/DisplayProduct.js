import React, { useContext } from 'react'
import './DisplayProduct.css';
import Card from './Card'
import CartContext from '../store/Cart-Context';
import Cart from './Cart';

const productsArr = [
    {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    },
    {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    },
    {
    title: 'Yellow and Black Colors',
    
    price: 70,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    
    },
    
    {
    
    title: 'Blue Color',
    
    price: 100,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    
    },{
      title:"T-Shirt",
      price:19,
      imageUrl:"https://prasadyash2411.github.io/ecom-website/img/Shirt.png"

    },
    {
      title:"Coffee-Cup",
      price:6,
      imageUrl:"https://prasadyash2411.github.io/ecom-website/img/Cofee.png"

    }
    
    ]

   

export default function DisplayProduct() {

  const ctx = useContext(CartContext)

  const showCart=()=>{
      ctx.setShowCart()
  }
  return (
    <div className='container mt-3'>
        <h3 className='text-center'>Music</h3>
    <div className='card_container row-cols-2 d-flex row'>
        {productsArr.map((item)=>{
          return <Card item={item} key={item.title} />
        })}
       </div>
       <div className='text-center' ><span className='btn btn-primary m-2' onClick={showCart} >Show Cart</span></div>
          <Cart/>
    </div>
  )
}
