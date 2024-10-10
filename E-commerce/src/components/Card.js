import React,{useContext} from 'react'
import './Card.css'
import CartContext from '../store/Cart-Context'
import { Link } from 'react-router-dom'

export default function Card({item}) {

  const ctx =useContext(CartContext)

const handleAdd =(item)=>{

  ctx.addToCart(item);
}



  return (
    <div  className='  card p-1 d-flex justify-content-center text-center mt-2'>
        <p className='fw-bold fs-4'>{item.title}</p>
        <div className='img_container d-flex justify-content-center text-center'>
         <div className='image' >   
        <Link to={`/productDetail/${item.title}?product=${encodeURIComponent(JSON.stringify(item))}`}> 
         <img className='' src={item.imageUrl} alt="image" />
         </Link>
          </div>
        </div>
        <div className=' m-3 d-flex justify-content-evenly align-items-center'>
            <span className="fw-bold ">${item.price}</span>
            <button className='addToCart_btn' onClick={()=>handleAdd(item)}>ADD TO CART</button>
        </div>
    </div>
  )
}
