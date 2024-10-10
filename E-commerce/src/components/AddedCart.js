import React, { useEffect } from 'react'
import './AddedCart.css'

export default function AddedCart({message,onClose}) {
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            console.log(message)
            onClose();
        },3000)
        return ()=>clearTimeout(timeout)
    },[onClose])
  return (
        <span style=
        {{
            position:"fixed",right:0,bottom:0,height:60,widht:300,fontWeight:"bold",
            fontSize:"1.4rem",paddingTop:5,color:"white",background:"#56CCF2",padding:15,margin:10
        
        }}>
            {message}</span>
  )
}

