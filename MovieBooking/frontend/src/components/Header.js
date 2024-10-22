import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { useDispatch } from 'react-redux';
import { saveCategory, updateSliderData } from '../store/movieSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firebase'


const Header = () => {

  const [list ,setList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(updateSliderData(list))
  },[list])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const categories = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const nowPlaying = categories.filter((item) => item.name === "Now playing")
      let data = new Array();
      nowPlaying.map((i)=>i.slider.map((link)=>data.push(link)));
      setList([
        { name: "Home", id: 1,slider:data },
        ...categories
      ]);
    });
    return () => unsubscribe(); 
  }, []);

  const handleClick=(name)=>{
      dispatch(saveCategory(name))
      navigate("/")
  }

  return (
    <header className="header p-1 bg-black" >
      <nav className=' d-flex align-items-center justify-content-around '>
        <span className=' title fw-bold fs-5'>BookMyMovie</span>
        <ul className='d-flex justify-content-end align-items-center pt-2 w-75 gap-3' style={{listStyleType:"none"}}>
         {list.map((item)=>{
          return <li key={item.id} onClick={()=>handleClick(item.name)} className='myli'>
              {item.name}
          </li>
         })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

