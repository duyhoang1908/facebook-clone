import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name:"modal",
    initialState:{
        register: false,
        status: false
    },
    reducers: {
        setRegister: (state, action) => {
            state.register = action.payload
        },
        setSatus: (state, action) => {
            state.status = action.payload
        }
    }
})