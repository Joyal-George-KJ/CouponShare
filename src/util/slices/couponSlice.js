import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
    name: "coupon",
    initialState: {
        coupon: null,
    },
    reducers: {
        setCoupon: (state, action) => {
            state.coupon = action.payload;
        },
    },
})


export const { setCoupon } = couponSlice.actions;
export default couponSlice.reducer;