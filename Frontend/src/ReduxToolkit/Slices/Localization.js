
import { createSlice } from "@reduxjs/toolkit";
import EN from "../../Translation/EN";
import AR from "../../Translation/AR";

const translation = {
    en: EN,
    ar: AR
}


const INITIAL_STATE = {
    Lang: "EN",
    translation: translation['en']
}


const Localization = createSlice({
    name: "Lang",
    initialState: INITIAL_STATE,
    reducers: {
        setLang(state,action) {
            state.Lang = action.payload;
            state.translation = translation[action.payload]
        }
    }
})

export const {setLang} = Localization.actions;

export default Localization.reducer;