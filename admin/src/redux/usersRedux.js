import { createSlice } from '@reduxjs/toolkit';


const usersSlice = createSlice({
    name: "users",
    initialState: {
        isFetching: false,
        error: false,
        users: []
    },
    reducers:{
     //get user
     getUserStart: (state) =>{
        state.isFetching= true;
        state.error = false;
    },
    getUserSuccess: (state, action) =>{
       state.isFetching= false;
        state.users=action.payload
    },
    getUserFailed: (state) =>{
       state.isFetching= false;
       state.error = true
    },
     //delete user
     deleteUserStart: (state) =>{
        state.isFetching= true;
        state.error = false
    },
    deleteUserSuccess: (state, action) =>{
       state.isFetching= false;
        state.users.splice(
            state.users.findIndex(item => item._id === action.payload.id),1
        )
    },
    deleteUserFailed: (state) =>{
       state.isFetching= false;
       state.error = true
    },
    //update
    updateUserStart: (state) =>{
        state.isFetching= true;
        state.error = false
    },
    updateUserSuccess: (state, action) =>{
       state.isFetching= false;
        state.users[
            state.users.findIndex(item => item._id === action.payload.id)
        ] = action.payload.user;
    },
    updateUserFailed: (state) =>{
       state.isFetching= false;
       state.error = true
    },
    //add
    addUserStart: (state) =>{
        state.isFetching= true;
        state.error = false
    },
    addUserSuccess: (state, action) =>{
       state.isFetching= false;
        state.users.push(action.payload);
    },
    addUserFailed: (state) =>{
       state.isFetching= false;
       state.error = true
    },
    }
});

export const {
   
     deleteUserStart,
     deleteUserSuccess,
     deleteUserFailed,
     updateUserStart,
     updateUserSuccess,
     updateUserFailed,
     addUserStart,
     addUserSuccess,
     addUserFailed,
     getUserStart,
     getUserSuccess,
     getUserFailed
    } = usersSlice.actions;
export default usersSlice.reducer;