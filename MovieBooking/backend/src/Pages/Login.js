import React, { useState } from 'react';
import './Login.css';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import {login} from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin123');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res =  await signInWithEmailAndPassword(auth,email, password);
      // Redirect to dashboard
      dispatch(login(res.idToken));
      navigate("/dashboard")

    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className='text-center admin'>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

