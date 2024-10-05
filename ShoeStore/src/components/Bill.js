import React,{useContext, useRef, useState} from 'react'
import Context from '../store/context-provider';
import './Bill.css'

export default function Bill() {
  const {item} =useContext(Context);
  console.log(item)
  let total=0;
    return (
        <ul className='ul'>
       { item.length>0 && <div className='bill_heading'>
          <span>Name</span>
          <span>Quantity</span>
          <span>Price</span>
         </div>
}
           {item && item.map((data)=>{
            total+=(data.quantity*data.price)
            return(
             
                <li key={data.id}>
                <span> {data.shoeName}</span>  
                <span>{data.quantity}</span>
                <span>{data.total}</span>
                </li>
            )
           })}
           
           {total >0 && <div className='total'>Total is {total}</div>}

        </ul>
  )
}
