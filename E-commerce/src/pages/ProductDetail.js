import React, { useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import CartContext from '../store/Cart-Context';

export default function ProductDetail() {
    const params=useParams()
    console.log(params)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const product = JSON.parse(decodeURIComponent(searchParams.get('product')));
    console.log(product)

    const ctx = useContext(CartContext)

    const handleAdd=(item)=>{
        ctx.addToCart(item)
    }

  return (
    <div className='d-flex my-4 '>
        <div className='border w-50 text-center h-100 w-50'>
            <img className='h-75 w-50' src={product.imageUrl} alt='image'/>
        </div>

        <div className='border w-50 d-flex flex-column justify-content-between'>
            <div className='mt-4'>
            <span className='fw-bold fs-3'>{product.title}</span><br/>
            <span>${product.price}</span><br/>
            <span>Rating:⭐️⭐️⭐️⭐️</span>
            </div>
            <div className='mb-5'>
                <button onClick={()=>handleAdd(product)} className='btn btn-primary'>Add To Cart</button>
            </div>
        </div>
    </div>
  )
}
