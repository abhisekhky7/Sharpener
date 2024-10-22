import React, { useContext, useState } from 'react';
import './TicketModal.css';
import db from '../firebase/firebase'
import { addDoc, collection } from 'firebase/firestore';

export default function TicketModal({ticketData,setPortal}) {

    const [userData,setUserData]=useState({
        name:'',
        email:'',
        phone:'',
        movieName:'',
        date:'',
        time:'',
    })

    const handlleChange=(e)=>{
        setUserData({...userData,
            [e.target.name]:e.target.value,
            movieName:ticketData?.movieName,
            time:ticketData?.time["time"],
            date:ticketData?.time["date"],
        }
            
        );
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

            try {
                await addDoc(collection(db,"bookedTickets"), userData); 
            } catch (err) {
              console.error('Error adding document:', err);
              return;
            }

        setUserData({
            name:'',
            email:'',
            phone:'',
            movieName:'',
            date:'',
            time:'',
        })
        setPortal(false);
        alert("Show booked!!");
    }
 

  return (
    <div className="modal" style={{color:'black'}}>
    <div className="modal-backdrop" onClick={()=>setPortal(false)}></div>
    <div className="modal-content text-center">
      <h2 className='' style={{color:'orange'}}>Book show</h2>
      <form onSubmit={handleSubmit}>
    <div className='d-flex flex-column align-items-center'>
      <label htmlFor='name' name="name">Name</label>
      <input className='w-50' type="text" value={userData.name} name="name" onChange={(e)=>handlleChange(e)}/>
    
      <label htmlFor='email'>Email</label>
      <input className='w-50' type="email" value={userData.email} name="email" onChange={(e)=>handlleChange(e)} />
    
      <label htmlFor='phone'>Phone No.</label>
      <input className='w-50' type="text" value={userData.phone} name="phone" onChange={(e)=>handlleChange(e)}/>
     
      <button className='btn btn-sm btn-primary mt-2' type="submit">Book</button>
      </div>
      </form>
    </div>
  </div>
  )
}
