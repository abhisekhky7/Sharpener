import React, { useContext, useRef, useState } from 'react'
import AuthContext from '../store/Auth-Context'
import {useNavigate} from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate();
  const [isLoggedIn,setLoggedIn]=useState()
  const [isLoading,setisLoading]=useState(false)
  const userNameRef = useRef()
  const passwordRef = useRef()

  const authCtx= useContext(AuthContext)

  const switchAuthModeHandler = ()=>{
    setLoggedIn((prev)=>!prev)
  }

  const handleSubmit=(event)=>{
        event.preventDefault();
        const email=userNameRef.current.value;
        const password=passwordRef.current.value;

        setisLoading(true)
        let url;
        if(isLoggedIn){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6rg8fyHFAJQjm7qIoNTFrhIZFMXDLLfQ'
        }else{
          url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6rg8fyHFAJQjm7qIoNTFrhIZFMXDLLfQ"
        }
        
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
              email,
              password,
              returnSecureToken:true,
            }),
            headers:{
              'Content-Type':'application/json'
            }
            }).then((res)=>{
            setisLoading(false);
            if(res.ok){
              return res.json();
            }else{
              return res.json().then((data)=>{
                alert(data.error.message)
              })
            }
          }).then((data)=>{
            authCtx.login(data.idToken)
              navigate("/")

          })
          .catch((err)=>{
            alert(err.message)
          })
        }

  

  return (
    <div  className="d-flex flex-column text-center bg-primary w-25 mx-auto px-2"  style={{height:"50vh"}}>
        <h3 className='text-white my-3 '>{isLoggedIn?"Login":"Sign Up"}</h3>
      <form onSubmit={handleSubmit} className=' px-2 text-center'>
        <div className=''>
        <label className='text-white my-2' htmlFor='username' >Email</label><br/>
        <input className='w-100' type='email' id='username' required ref={userNameRef}/>
        </div>
        <div>
        <label className='text-white my-2' htmlFor='username'>Password:</label><br/>
        <input className='w-100' type='password' required id='password' ref={passwordRef}/>
        </div>
        <div className='d-flex justify-content-center flex-column w-75 mx-auto'>
          <button className='btn btn-primary border border-white mt-2'>
            {isLoggedIn ?'Login':'Create Account'}
            </button>
        <button type='button'
         onClick={switchAuthModeHandler}
         className='mt-3 btn btn-primary border border-white'>
         
        {isLoggedIn?'Create new account':'Login with existing account'}
        
          </button>
        </div>
      </form>
    </div>
  )
}

