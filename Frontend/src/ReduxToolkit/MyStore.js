import { configureStore } from "@reduxjs/toolkit";
import Localization from "./Slices/Localization";



export default configureStore({
    reducer: {
        Localization
    }
})