import React, { useState } from 'react'
import AddCategory from './AddCategory';
import AddMovies from './AddMovies';
import ShowTimeManagement from './ShowTimeManagement';
import BookedMovies from './BookedMovies';

export default function Dashboard() {

    
   const [show,setShow]=useState({
    addCategory:true,
    addMovie:false,
    showtimeManagement:false,
    bookedMovies:false,
   })
  
    const handleShow = (name)=>{
      setShow(()=>{
        const newShow = {editor:false,inbox:false,sentbox:false};
        return {...newShow,[name]:true}
      })
    }
  
  
    return (
      <div className='d-flex mt-3 ' style={{height:"90vh"}}>
  
        <ul className='fw-semibold lix-3 fs-6  border w-25 text-center'>
          <li onClick={()=>handleShow('addCategory')} className='sidelianel liy-2 '> Add Category</li>
          <li  onClick={()=>handleShow('addMovie')}  className='sidelianel '> Add Movie</li>
          <li  onClick={()=>handleShow('showtimeManagement')}  className='sidelianel '> ShowTime Management</li>
          <li  onClick={()=>handleShow('bookedMovies')}  className='sidelianel '> Booked Movies</li>
        </ul>
       
        <div className='border w-75 ms-5'> 
          {show.addCategory && <AddCategory/>}
          {show.addMovie && <AddMovies/>}
          {show.showtimeManagement && <ShowTimeManagement/>}
          {show.bookedMovies && <BookedMovies/>}
        </div>
     
      </div>
    )
  
}
