import React,{useContext, useState} from 'react'
import './AddProduct.css'
import Context from '../store/context-provider';

export default function AddProduct(props) {
    const {item} = useContext(Context)
  
    const [shoeName,setShoeName]=useState("abc");
    const [description,setDescription]=useState("def");
    const [price,setPrice]=useState(0);
    const [largeQuantity,setLargeQuantity]=useState(0);
    const [mediumQuantity,setMediumQuantity]=useState(0);
    const [smallQuantity,setSmallQuantity]=useState(0);


    const handleSubmit = (event)=>{
        event.preventDefault();
       if(!shoeName||!description||!price||!largeQuantity||!mediumQuantity||!smallQuantity){
        alert("Fill all the fields")
        return;
       }

      props.setProduct((prev)=>{
        return [...prev,{
            shoeName,description,price,largeQuantity,mediumQuantity,smallQuantity,id:Math.random().toString(),
        }]
      })

      setShoeName("")
      setDescription("")
      setPrice(0)
      setLargeQuantity(0)
      setMediumQuantity(0)
      setSmallQuantity(0)
        
    }
  return (
    <div className='form_container'>
        <form onSubmit={handleSubmit}>
            <div className='input_container'>
                <div className='first'>
                    <div>
                        <label htmlFor='shoeName'>ShoeName</label>
                        <input type='text' id='shoeName' value={shoeName} onChange={(e)=>setShoeName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <input type='text' id='description' value={description} onChange={(e)=>setDescription(e.target.value)}/> 
                    </div>
                    <div>
                        <label htmlFor='price'>Price</label>
                        <input type='number' id='price' min={1} value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
            </div>
            <div className='quantity_container'>
                <p>Quantity Available</p>
                <div>
                    <div>
                        <label htmlFor='large'>Large</label>
                        <input type='number' id='large' min={1} value={largeQuantity} onChange={(e)=>setLargeQuantity(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='medium'>Medium</label>
                        <input type='number' id='medium' min={1} value={mediumQuantity} onChange={(e)=>setMediumQuantity(e.target.value)}/> 
                    </div>
                    <div>
                        <label htmlFor='small'>Small</label>
                        <input type='number' id='small' min={1} value={smallQuantity} onChange={(e)=>setSmallQuantity(e.target.value)}/>
                    </div>
               </div>
             </div>
             <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <button type='submit'>Add Product</button>
                <p style={{margin:5}}>Cart {item[0]?.count}</p>
            </div>

            </div>

           

        </form>
       
    </div>
  )
}
