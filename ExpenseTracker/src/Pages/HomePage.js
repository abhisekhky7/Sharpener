import React, { useContext, useEffect, useState } from 'react'
import DisplayExpense from '../components/DisplayExpense'
import './HomePage.css'
import Loader from '../components/Loader';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HomePage(){

  const [amount,setAmount] = useState('')
  const [desc,setDesc] = useState('')
  const [category,setCategory] = useState('Petrol')
  const [isLoading,setisLoading]=useState(false)
  const [list,setList]=useState([]);
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

  const handleCategory =(cat) =>{
    setCategory(cat);
  }
    const fetchData = async ()=>{
      setisLoading(true);
      try{
        console.log("calling api")
        const response = await fetch("https://sharpener-b0c8a-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json");
        if(!response.ok){
          alert("Something went wrong");
          return;
        }
        
        const data = await response.json();
          const newList = [];
          for(let i in data){
            newList.push({...data[i],id:i});
          }
          console.log(newList)
          setList(newList)
       

      }catch(err){
        console.log(err)
      }finally{
        setisLoading(false);
      }
    }
  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(!amount || !desc){
      alert("Fill all the inputs");
      return;
    }
    setisLoading(true);
    try {
      const response = await fetch("https://sharpener-b0c8a-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json",{
        method:"POST",
        body:JSON.stringify({
          amount,
          desc,
          category,
        }),
        headers:{
          'Content-Type':'aplication/json',
        }
      })

      if(!response.ok){
        const error = await response.text();
        throw new Error(`Error updating entry: ${error}`);
      }
      if(response.ok){
        console.log("successfully added")
      }
      fetchData();

    } catch (error) {
      alert("Something went wrong.")
      console.log(error)
    }finally{
      setisLoading(false);
      setAmount(0);
      setDesc("");
      setCategory("Petrol")
    }

  }
  useEffect(()=>{
    fetchData();
  },[])

  const handleDelete =async (id)=>{
    try {
      await fetch(`https://sharpener-b0c8a-default-rtdb.asia-southeast1.firebasedatabase.app/expense/${id}.json`,{
            method:"DELETE"
        })
       await  fetchData();
    } catch (error) {
        alert("Error deleting data",error)
    }
}

  const handleEdit =async (item)=>{
    setCategory(item.category);
    setAmount(item.amount);    setDesc(item.desc)

    await handleDelete(item.id)

  }



  return (<>
   {!isLoggedIn? <div className='first-login'><Link to={'/login'}>Please Login First</Link></div> : <div className=' d-flex flex-column align-items-center mt-3'>
        <h3 className='fw-bold'>Add Expense</h3>
        <form onSubmit={handleSubmit}>
          <div className='border p-3 fw-medium'>
          <label className=' mx-1'>Amount Spent</label>
          <input type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          <label className='mx-1'>Description</label>
          <input type='text' value={desc} onChange={(e)=>setDesc(e.target.value)} />
          <div className="dropdown  text-end p-2">
            <button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {category}
            </button>
            <ul className="dropdown-menu px-3">
              <li onClick={()=>handleCategory('Petrol')} >Petrol</li>
              <li onClick={()=>handleCategory('Food')} >Food</li>
              <li onClick={()=>handleCategory('Travel')} >Travel</li>
              <li onClick={()=>handleCategory('Misc')} >Misc</li>
              <li onClick={()=>handleCategory('Clothes')}>Clothes</li>
            </ul>
        </div>
    <div className=' text-center' > 
      <button type='submit' className='btn btn-dark btn-md'>Add</button>
      </div>
          </div>
        </form>
       <DisplayExpense handleDelete={handleDelete} handleEdit={handleEdit} list={list}/>
       {isLoading && ReactDOM.createPortal(<Loader/>,document.getElementById('portal'))}
    </div>}
    </>
  )
}
