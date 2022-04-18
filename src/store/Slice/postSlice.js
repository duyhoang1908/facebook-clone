import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:"posts",
    initialState:{
       postList:[],
       currentPost:{},
       isUpdate: false
    },
    reducers: {
        setPostList: (state, action) => {
            state.postList = action.payload
        },
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload
        },
        setIsUpdate: (state, action) => {
            state.isUpdate = action.payload
        }
    }
})