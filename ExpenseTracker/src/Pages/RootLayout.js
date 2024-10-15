import React, { useState,useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";
import '../App.css'

export default function RootLayout() {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || false
  );

  const uid = useSelector((state) => state.auth.uid); 
  const token = useSelector((state) => state.auth.token);

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

  const downloadJSON = (jsonData, filename) => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownload = async () => {
    const databaseURL = `https://sharpener-b0c8a-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}/expenses.json?auth=${token}`;  // Firebase URL
  
    try {
      const response = await fetch(`${databaseURL}`, { method: 'GET' });
      
      if (response.ok) {
        const data = await response.json();
  
        downloadJSON(data, 'firebase-data.json');
      } else {
        console.error('Failed to fetch data: ', response.statusText);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  

  return (
    <div className="">
      {isLoggedIn && (
        <>
          <div className="border d-flex justify-content-between align-items-center p-2">
            <p className="fw-bold pt-1 fs-4">Welcome to Expense Tracker</p>
             <div className="dropdown  text-end p-2">
                <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Menu
                </button>
                <ul className="dropdown-menu px-3 menu">
                 {/* <li><Link to={'/profile'}>Profile</Link></li> */}
                 <li onClick={toggleTheme}> {isDarkMode ? 'Light' : 'Dark'} Mode</li>
                 <li onClick={handleDownload}>Download data</li>
                 <li onClick={handleLogout}>Logout</li>
               </ul>
        </div>
          </div>
        </>

      )}
      <Outlet />

    </div>
  );
}
