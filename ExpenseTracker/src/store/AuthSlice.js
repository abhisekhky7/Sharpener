import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:!!localStorage.getItem('token'),
    token:localStorage.getItem('token')||null,
    uid:localStorage.getItem('uid') || null,

}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.uid = action.payload.uid;
            localStorage.setItem('uid',action.payload.uid)
            localStorage.setItem('token',action.payload.token)
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.token = null;
            state.uid = null;
            localStorage.removeItem('uid');
            localStorage.removeItem("token");
        }
    }
})
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;