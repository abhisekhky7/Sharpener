import { createSlice } from "@reduxjs/toolkit";

const moveiSlice = createSlice({
    name:"movieSlice",
    initialState:{
        list:[],
        category:"Now playing",
        sliderData:[],
    },
    reducers:{
        saveCategory:(state,action)=>{
            if(action.payload==="Home"){
                state.category="Now playing";
                return;
            }
            state.category = action.payload
        },
        updateSliderData:(state,action)=>{
            state.sliderData = action.payload;
        },
    }
})

export const {saveCategory,updateSliderData} = moveiSlice.actions;

export default moveiSlice.reducer;
