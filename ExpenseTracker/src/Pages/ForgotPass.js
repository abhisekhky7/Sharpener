import React, { useState } from 'react';
import './ForgotPass.css';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Loader from '../components/Loader';

export default function ForgotPass() {
    const [email,setEmail]=useState('');
    const [isLoading,setisLoading]=useState(false);

    const handleEmail =async ()=>{
        if(!email){
            alert("Provide the email")
            return;
        }
        setisLoading(true);
            try {
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB6rg8fyHFAJQjm7qIoNTFrhIZFMXDLLfQ",{
                    method:"POST",
                    body:JSON.stringify({
                        requestType:'PASSWORD_RESET',
                        email,
                    })
                })
                if(!response.ok){
                    alert("Something went wrong. Try Again.")
                    console.log(response.json());
                }
                const data =  response.json();
                console.log("email sent")
                console.log(data)
            } catch (error) {
                console.log(error.message)
            }finally{
                setEmail("");
                alert("Email sent");
                setisLoading(false);
            }
        

    }
  return (
    <div className='forgot-container'>
        <div className='d-flex flex-column w-50 align-items-center gap-3 mx-auto border bg-dark text-white p-2 rounded-3'>
        <span className='fs-5'>Enter the email with which you have registered</span>
        <input className='w-75 mx-auto' type='email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <button className='btn btn-danger w-25 text-center' onClick={handleEmail}>Send Link</button>
        <Link to={'/login'}>Already a user? Login</Link>
        </div>
        {isLoading && ReactDOM.createPortal(<Loader/>,document.getElementById('portal'))}
    </div>
  )
}
