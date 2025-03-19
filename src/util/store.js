import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
    reducer: {
        // Reducers
        user: userReducer,
    }
})

export default store;