import React, { useContext, useEffect, useState } from 'react'
import DisplayExpense from '../components/DisplayExpense'
import './HomePage.css'
import Loader from '../components/Loader';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {saveExpenseToFirebase,deleteExpense} from '../store/ExpenseSlice';

export default function HomePage(){

  const [amount,setAmount] = useState('')
  const [desc,setDesc] = useState('')
  const [category,setCategory] = useState('Petrol')
  const [isLoading,setisLoading]=useState(false)
  const [list,setList]=useState([]);
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const expense = useSelector((state)=>state.expenses.expenses);
  const dispatch = useDispatch();


  const handleCategory =(cat) =>{
    setCategory(cat);
  }

    
  const handleSubmit =  (event)=>{
    event.preventDefault();
    if(!amount || !desc){
      alert("Fill all the inputs");
      return;
    }
    dispatch(saveExpenseToFirebase({amount,desc,category,id:Math.random().toString()}));
   
    setAmount(0);
    setDesc("");
    setCategory("Petrol")

  }


  const handleDelete = (fireId,id)=>{
    dispatch(deleteExpense({fireId,id}))
   
}

  const handleEdit =async (item)=>{
    setCategory(item.category);
    setAmount(item.amount);   
     setDesc(item.desc)
    handleDelete(item.fireId,item.id)

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
