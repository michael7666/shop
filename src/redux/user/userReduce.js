
import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        newUser: null
    },
    reducers:{
     loginStart: (state) =>{
         state.isFetching= true
     },
     loginSuccess: (state, action) =>{
        state.isFetching= false;
         state.currentUser=action.payload
     },
     loginFailed: (state) =>{
        state.isFetching= false;
        state.error = true
     },
     //register
     registerStart: (state) =>{
      state.isFetching = true;
      state.error = false;
     },
     registerSuccess: (state,action) =>{
        state.isFetching = false;
        state.newUser = action.payload;
       },
       registerFailure: (state) =>{
        state.isFetching = false;
        state.error = true;
       },
     logout: (state) =>{
         state.currentUser = null;
     },

    }
});

export const {loginStart, loginSuccess,loginFailed,registerStart, registerSuccess, registerFailure, logout} = userSlice.actions;
export default userSlice.reducer;