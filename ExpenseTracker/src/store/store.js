import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import expensesReducer from './ExpenseSlice';

const store = configureStore({
   reducer:{
    auth:authReducer,
    expenses:expensesReducer,
   } 
})

export default store;