import React, { memo, useEffect, useMemo, useState } from 'react';
import './DisplayExpense.css';
import { useDispatch, useSelector } from 'react-redux';
import {deleteExpense, fetchExpenseFromFirebase} from '../store/ExpenseSlice';


const DisplayExpense=({handleDelete,handleEdit})=> {
  

  const dispatch = useDispatch();
  const total = useSelector((state)=>state.expenses.totalAmount)
  const list = useSelector((state)=>state.expenses.expenses);

  useEffect(() => {
    dispatch(fetchExpenseFromFirebase());
  }, [list]);

 

  return (
    <ul className=' w-50 text-center mt-3' style={{listStyle:"none"}}>
        {list.length >0 && <div>
                {list.map((item)=>{
                    return <li key={item.id||item.fireId} className=' border d-flex justify-content-center align-items-center'>
                        <span className=' fw-semibold w-25 mx-0'>{item.category}</span>
                        <span className=' w-25 mx-0 '>{item.desc}</span>
                        <span className=' w-25 mx-0 '>{item.amount}rs</span>
                        <button className='btn btn-dark btn-sm mx-1 mt-1 ' onClick={()=>handleEdit(item)}>Edit</button>

                        <button onClick={()=>handleDelete(item.fireId,item.id)} className='btn btn-sm btn-danger mx-1 my-1'>X</button>
                    </li>
                })}
               {total > 0 && <div className=' d-flex justify-content-between m-3 mx-auto ' style={{borderTop:"1px solid black"}}>
                   <span className='w-50  fw-semibold  border-danger'>Total</span>
                   <span className='w-75   border-danger'>{total}rs</span>
                  </div>}
            </div>}
    </ul>
  )
}


export default memo(DisplayExpense)