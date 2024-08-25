import { createSlice } from "@reduxjs/toolkit";

const getInitialCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.length;
};

const INITIAL_STATE = {
    count: getInitialCount()
};

const wishListSlice = createSlice({
    name: "wishList",
    initialState: INITIAL_STATE,
    reducers: {
        increment(state) {
            state.count += 1;
        },
        decrement(state) {
            state.count -= 1;
        },
        setWishList(state, action) {
            state.count = action.payload;
        }
    }
});

export const { increment, decrement, setWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
