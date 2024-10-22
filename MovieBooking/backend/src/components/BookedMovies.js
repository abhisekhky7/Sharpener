import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase';

export default function BookedMovies() {

  const [list ,setList] = useState([]);
  console.log(list)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookedTickets'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setList(data);
    });
    return () => unsubscribe();
  }, []); 


  return (
    <div>
    <div className='text-center my-3'><h3>BookedMovies</h3></div>
    <div className=' d-flex text-center' style={{marginLeft:30}}>
      <p className='border w-25'>Movie</p>
      <p className='border w-25'>Username</p>
      <p className='border w-25'>Phone</p>
      <p className='border w-25'>Email</p>
      <p className='border w-25'>Date & Time</p>

    </div>
    <ul>
      {list.map((item)=><li className='border d-flex text-center' key={item.id}>
          <p className=' w-25'>{item.movieName}</p>
          <p className=' w-25'>{item.name}</p>
          <p className=' w-25'>{item.phone}</p>
          <p className=' w-25'>{item.email}</p>
          <p className=' w-25'><span>{item.date}</span> <span>{item.time}</span></p>
          
      </li>)}
    </ul>
    </div>
  )
}
