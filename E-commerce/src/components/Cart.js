import React, { useContext, useState } from 'react'
import CartContext from '../store/Cart-Context'
import './Cart.css'
export default function Cart() {

    const {showCart,cart,removeCart,setShowCart,purchaseFun}= useContext(CartContext)
    let total=0;

    const handlePurchase = ()=>{
            purchaseFun();
    }

    const handleRemove = (id)=>{
            removeCart(id)
    }

    const handleClose=()=>{
            setShowCart()
    }

   return(
    <>
    {showCart && <div className='cart'> 
        <section id="cart" className="container" style={{display:"block"}}>
            <div className='d-flex justify-content-between'> <h2>CART</h2>
            <button className="cancel btn btn-danger" onClick={handleClose}>X</button>
            </div>
            <div className="cart-row cart-header">
                <span className="cart-item cart-column">ITEM</span>
                <span className="cart-price cart-column">PRICE</span>
                <span className="cart-quantity cart-column">QUANTITY</span>
            </div>

            {cart.length > 0 && cart.map((item)=>{
                total+=item.price
                return(
                    <div className="cart-items">
                 <div className="cart-row">
                    <span className='cart-item cart-column'>
                        <img className='cart-img' src={item.imageUrl} alt={item.title}/>
                        <span>{item.title}</span>
                    </span>
                    <span className='cart-price cart-column'>${item.price}</span>
                    <span className='cart-quantity cart-column'>
                        <input type="text" value="1"/>
                        <button onClick={()=>handleRemove(item.title)}>REMOVE</button>
                    </span>
                </div>
            </div>
                )
            })}

           
          
            <div className="cart-total">
                <span>
                    <span className="total-title"> <strong>Total</strong>
                        </span>
                    $<span id="total-value">{total}</span>
                </span>
            </div>
            <button className="purchase-btn" type="button" onClick={handlePurchase}>PURCHASE</button>
        </section></div>}
    </>
   )
}



