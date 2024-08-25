import { configureStore } from "@reduxjs/toolkit";
import Localization from "./Slices/Localization";
import wishListSlice from './Slices/WishListSlice'


export default configureStore({
    reducer: {
        Localization,
        wishListSlice,
    }
})