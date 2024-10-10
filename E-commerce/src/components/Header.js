import React, { useContext } from 'react'
import './Header.css'
import CartContext from '../store/Cart-Context'
import { Link,useNavigate } from 'react-router-dom';
import AuthContext from '../store/Auth-Context';


export default function Header() {
  const ctx = useContext(CartContext);
  const {isLoggedIn,logout} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleCart = ()=>{
    ctx.setShowCart()
  }

  const handleLogout = () =>{
    logout();
    navigate("/")
    

  }

  return (
    <header>
       
        <ul className=''>
        <li> <Link to="/">HOME</Link></li>
        <li> <Link to="/store">STORE</Link></li>
        <li> <Link to="/about">ABOUT</Link></li>
        <li onClick={isLoggedIn?handleLogout:null}> <Link to="/login">{isLoggedIn?"Logout":"Login"}</Link></li>
        <button className='text-white' style={{position:"absolute",right:"2%",background:"black",border:"2px solid blue"}} onClick={handleCart}>Cart {ctx.count}</button>
        </ul>
        <h1>The Generics</h1>

    </header>
  )
}
