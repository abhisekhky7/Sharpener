import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const firebaseUrl = "https://sharpener-b0c8a-default-rtdb.asia-southeast1.firebasedatabase.app";

export const saveExpenseToFirebase = createAsyncThunk(
    'expenses/saveExpense',
    async (expense, {getState,rejectWithValue})=>{

        const {auth} = getState();
        const{uid,token} = auth
        if (!uid || !token) {
            return rejectWithValue('User not authenticated');
          }

        try {
            const response = await fetch(`${firebaseUrl}/users/${uid}/expenses.json?auth=${token}`,{
                method:"POST",
                body:JSON.stringify(expense),
                headers:{
                    'Content-Type':'application/json',
                  }
            })
          return {...expense,id:Math.random().toString()};
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchExpenseFromFirebase = createAsyncThunk(
    'expenses/fetchExpenses',
    async (_,{getState,rejectWithValue})=>{
        console.log("init fetch")
        const { auth } = getState(); // Access the auth slice
        const { uid, token } = auth;
        if (!uid || !token) {
            console.log("returning")
          return rejectWithValue('User not authenticated');
        }

        try {
            console.log("fetching...")
            const response = await fetch(`${firebaseUrl}/users/${uid}/expenses.json?auth=${token}`);;
            const data = await response.json();
            const expenses = new Array();
            for(let i in data){
                expenses.push({...data[i],fireId:i});
            }
            return expenses
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteExpense = createAsyncThunk(
    'expenses/deleteExpenses',
    async({fireId,id},{getState,rejectWithValue})=>{

        const { auth } = getState(); // Access the auth slice
    const { uid, token } = auth;
    if (!uid || !token) {
      return rejectWithValue('User not authenticated');
    }
        const url ="https://sharpener-b0c8a-default-rtdb.asia-southeast1.firebasedatabase.app"
        try {
            console.log("deleting api called")
            await fetch(`${firebaseUrl}/users/${uid}/expenses/${fireId}.json?auth=${token}`, {
                method: "DELETE"
              });
          
              return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)



const initialState = {
    expenses:[],
    totalAmount:0,
    status:'idle',
    error:null,
}

const expensesSlice = createSlice({
    name:'expenses',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(saveExpenseToFirebase.fulfilled,(state,action)=>{
            const newTotal = +state.totalAmount+ +action.payload.amount;
            state.expenses.push(action.payload);
            state.totalAmount = newTotal;
        })
        .addCase(fetchExpenseFromFirebase.fulfilled,(state,action)=>{
            const totalAmount = action.payload.reduce((sum,expense)=> +sum+ +expense.amount,0);
            state.expenses = action.payload;
            state.totalAmount = totalAmount;
        })
        .addCase(fetchExpenseFromFirebase.rejected,(state,action)=>{
            state.error=action.payload;
        })
        .addCase(deleteExpense.fulfilled,(state,action)=>{
            const newExpenses = state.expenses.filter((item) => item.id !== action.payload);
            state.expenses = newExpenses;
            const newTotal = newExpenses.reduce((sum, expense) => +sum + +expense.amount, 0);
            state.totalAmount = newTotal;
        })
        .addCase(deleteExpense.rejected, (state, action) => {
            state.error = action.payload;
          });
    }
});

export default expensesSlice.reducer;