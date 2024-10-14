import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:!!localStorage.getItem('token'),
    token:localStorage.getItem('token')||null,

}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log("payload",action.payload)
            state.isLoggedIn = true;
            state.token = action.payload;
            localStorage.setItem('token',action.payload)
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
})
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;