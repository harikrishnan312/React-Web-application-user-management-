import { createSlice } from "@reduxjs/toolkit";

const userEditSlice = createSlice({
    name:'userEdit',
    initialState:{
        userEdit : ''
    },
    reducers:{
        setUserEdit:(state,action)=>{
            state.userEdit = action.payload
        }
    }
})

export const {setUserEdit} = userEditSlice.actions

export default userEditSlice.reducer  