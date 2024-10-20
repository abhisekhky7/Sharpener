import React, { useEffect, useState } from "react";
import  db  from "../firebase/firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import './AddCategory.css';
import { savetoDb,fetchData,deleteFromDb } from "../utils/savetoDb";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [list ,setList]=useState([{name:"loading",id:1},]);

  const addCategory = async (e) => {
    e.preventDefault();
    savetoDb("categories",{name:category});
      setCategory("");
   
  };

  const handleDelete =async (id)=>{
    deleteFromDb("categories",id)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setList(data);
    });
    return () => unsubscribe();
  }, []); 

  return (
    <div>
      
      <ul className="d-flex border gap-2">
        {list.map((item)=>{
          return <li key={item.id} className="d-flex align-items-center  rounded-2">
            {item.name}
            <span onClick={()=>handleDelete(item.id)} className="ms-1 btn btn-sm border text-danger fw-bold">X</span>
          </li>
        })}
      </ul>


      <h2>Add Category</h2>
      <form onSubmit={addCategory}>
        <input
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
