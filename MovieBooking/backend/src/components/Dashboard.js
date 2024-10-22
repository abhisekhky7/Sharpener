import React, { useState } from 'react'
import AddCategory from './AddCategory';
import AddMovies from './AddMovies';
import ShowTimeManagement from './ShowTimeManagement';
import BookedMovies from './BookedMovies';
import './Dashboard.css';


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
  
        <ul className='fw-semibold  fs-6 w-25 d-flex flex-column'>
          <li onClick={()=>handleShow('addCategory')} className='btn btn-outline-primary  '> Add Category</li>
          <li  onClick={()=>handleShow('addMovie')}  className='btn btn-outline-primary '> Add Movie</li>
          <li  onClick={()=>handleShow('showtimeManagement')}  className='btn btn-outline-primary '> ShowTime Management</li>
          <li  onClick={()=>handleShow('bookedMovies')}  className='btn btn-outline-primary '> Booked Movies</li>
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
