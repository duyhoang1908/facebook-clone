import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./Slice/modalSlice";
import { postSlice } from "./Slice/postSlice";
import { roomSlice } from "./Slice/roomSlice";
import { userSlice } from "./Slice/userSlice";


const store = configureStore({
    reducer:{
        user: userSlice.reducer,
        modal: modalSlice.reducer,
        room: roomSlice.reducer,
        posts: postSlice.reducer
    }
})

export default store