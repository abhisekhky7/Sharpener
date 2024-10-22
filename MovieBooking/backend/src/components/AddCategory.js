import React, { useEffect, useState } from "react";
import  db  from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import './AddCategory.css';
import { savetoDb,deleteFromDb } from "../utils/savetoDb";


const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [list ,setList]=useState([{name:"loading",id:1},]);
  const [slider,setSlider]=useState([])
  const [sliderLink,setSliderLink]=useState('')

  const addCategory = async (e) => {
    e.preventDefault();
    savetoDb("categories",{name:category,slider});
      setCategory("");
      setSlider([])

  };


  const handleAddSlider= ()=>{
      if(!sliderLink)return;
      setSlider([...slider,sliderLink]);
      setSliderLink("");
  }

  const handleRemove = (id)=>{
    const newSlider = slider.filter((item,ind)=>ind!==id);
    setSlider(newSlider);
  }

  

  const handleDelete =async (id)=>{
    deleteFromDb("categories",id);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setList(data);
    });
    return () => unsubscribe();
  }, []); 

  return (
    <div className="">
      
      <ul className="d-flex border gap-2">
        {list.map((item)=>{
          return <li key={item.id} className="d-flex align-items-center  rounded-2">
            {item.name}
            <span onClick={()=>handleDelete(item.id)} className="ms-1 btn btn-sm border text-danger fw-bold">X</span>
          </li>
        })}
      </ul>

        <div>
      <h2>Add Category</h2>
      <form onSubmit={addCategory}>
        <input
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /><br/>
        <input type="text" value={sliderLink} placeholder="slider link" onChange={(e)=>setSliderLink(e.target.value)}/>
        <button type="button" className="btn btn-sm btn-primary ms-1" onClick={handleAddSlider}>Add link</button><br/>
        <button type="submit" className="btn btn-primary btn-sm">Add Category</button>
      </form>
      <ul>
          {slider.map((item,ind)=><li className="sliderLi" onClick={()=>handleRemove(ind)}  key={ind}>
            Image {ind+1} <span className="text-danger">X</span>
            </li>)}
      </ul>
      </div>
    </div>
  );
};

export default AddCategory;
