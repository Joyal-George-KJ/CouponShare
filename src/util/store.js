import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import couponReducer from "./slices/couponSlice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
    reducer: {
        // Reducers
        user: userReducer,
        coupon: couponReducer,
        theme: themeReducer,
    }
})

export default store;