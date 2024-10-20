import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <header className="header p-1 bg-black border">
      <nav className=' d-flex align-items-center justify-content-around '>
        <span className='border'>MyMovie</span>
        <ul className='d-flex justify-content-end align-items-center pt-2 w-75 gap-3' style={{listStyleType:"none"}}>
          <li className='myli'><Link to="/">Home</Link></li>
          <li className='myli'><Link to="/movies">Top Rated</Link></li>
          <li className='myli'><Link to="/movies">Now Playing</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
