import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CartContextProvider} from './store/Cart-Context';
import { AuthContextProvider } from './store/Auth-Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartContextProvider>
        <AuthContextProvider>
          <App />
          </AuthContextProvider>
    </CartContextProvider>
);


