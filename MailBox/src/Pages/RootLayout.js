import React, { useState,useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";
import '../App.css'

export default function RootLayout() {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const userEmail = useSelector((state)=>state.mail.userEmail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || false
  );

  const uid = useSelector((state) => state.auth.uid); 
  const token = useSelector((state) => state.auth.token);


  useEffect(()=>{
    if(!isLoggedIn)navigate('/login')
  },[])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  

  return (
    <div className="">
      { (
        <>
          <div className="border bg-dark text-white d-flex justify-content-between align-items-center p-2">
            <p className="fw-bold pt-1 fs-4">Welcome to Mailbox </p>
             <div className="dropdown  text-end p-2">
                <span className="mx-2">{userEmail}</span>
                <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Menu
                </button>
                <ul className="dropdown-menu px-3 menu">
                 <li onClick={handleLogout}>Logout</li>
               </ul>
        </div>
          </div>
        </>

      ) }
      <Outlet />

    </div>
  );
}
