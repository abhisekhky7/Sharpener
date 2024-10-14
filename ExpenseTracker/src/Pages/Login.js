import React, {useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import './Login.css'
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux'
import {  login } from '../store/AuthSlice'

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn,setLoggedIn]=useState(false);
  const [isLoading,setisLoading]=useState(false)
  const [userName,setUserName] = useState('');
  const [pass,setPass] = useState('');

 


  const switchAuthModeHandler = ()=>{
    setLoggedIn((prev)=>!prev)
  }

  const handleSubmit=(event)=>{
        event.preventDefault();
        const email=userName;
        const password=pass;

        setisLoading(true)
        let url;
        if(isLoggedIn){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6rg8fyHFAJQjm7qIoNTFrhIZFMXDLLfQ'
        }else{
          url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6rg8fyHFAJQjm7qIoNTFrhIZFMXDLLfQ"
        }
        console.log("calling api i guess")
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
            if(res.ok){
              return res.json();
            }else{
              return res.json().then((data)=>{
                alert(data.error.message)
              })
            }
          }).then((data)=>{
            if (isLoggedIn) {
                dispatch(login(data.idToken))
                navigate('/'); 
              } else {
                alert("User created")
                navigate('/login'); 
                setLoggedIn(true);
              }

          }) .catch((err)=>{
            alert(err.message)
          }).finally(()=>{
            setisLoading(false);
            setUserName('');
            setPass('');
          })
        }

  

  return (

    <div className=' d-flex flow-column justify-content-center align-items-center ' style={{height:"100vh"}}> 
    <div  className="d-flex flex-column text-center bg-dark w-25 mx-auto   px-2"  style={{height:"55vh"}}>
        <h3 className='text-white my-3 mb-3 '>{isLoggedIn?"Login":"Sign Up"}</h3>
      <form onSubmit={handleSubmit} className=' px-2 text-center'>
        <div className=''>
        <label className='text-white my-2' htmlFor='username' >Email</label><br/>
        <input className='w-100' type='email' id='username' required value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div>
        <label className='text-white my-2' htmlFor='username'>Password:</label><br/>
        <input className='w-100' type='password' required id='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
        </div>
        <div className='d-flex justify-content-center flex-column w-75 mx-auto'>
        {isLoggedIn &&  <div className='forgot-password'><Link to={'/forgot'} className='forgot-password'>Forgot Password?</Link></div>}
          <button className='btn btn-danger border border-white mt-4'>
            {isLoggedIn ?'Login':'Create Account'}
            </button>
        <button type='button'
         onClick={switchAuthModeHandler}
         className='mt-3 btn btn-danger border border-white'>
         
        {isLoggedIn?'Create new account':'Login with existing account'}
        
          </button>
        </div>
      </form>
      {isLoading && ReactDOM.createPortal(<Loader/>,document.getElementById('portal'))}
    </div>
    </div>
  )
}

