import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import couponReducer from "./slices/couponSlice";

const store = configureStore({
    reducer: {
        // Reducers
        user: userReducer,
        coupon: couponReducer,
    }
})

export default store;