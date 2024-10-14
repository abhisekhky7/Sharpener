import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    expenses:[],
    totalAmount:0,
    isPremium:false,
}

const expensesSlice = createSlice({
    name:'expenses',
    initialState,
    reducers:{
        addExpense:(state,action)=>{
            const newTotal = state.totalAmount + action. payload.amount;
            state.expenses.push(action.payload);
            state.totalAmount = newTotal;
            state.isPremium=newTotal > 10000;
        },
        setExpenses:(state,action)=>{
            const totalAmount = action.payload.reduce((sum,expense)=>sum+expense.amount,0);
            state.expenses = action.payload;
            state.totalAmount = totalAmount;
            state.isPremium = totalAmount > 10000;
        }
    }
});

export const {addExpense,setExpenses} = expensesSlice.actions;
export default expensesSlice.reducer;