
import { createSlice } from "@reduxjs/toolkit";
import EN from "../../Translation/EN";
import AR from "../../Translation/AR";

const translation = {
    en: EN,
    ar: AR
}


const INITIAL_STATE = {
    Lang: "EN",
    direction: "ltr",
    translation: translation['en']
}


const Localization = createSlice({
    name: "Lang",
    initialState: INITIAL_STATE,
    reducers: {
        setLang(state,action) {
            state.Lang = action.payload;
            state.translation = translation[action.payload]
        },
        setDirection (state,action) {
            state.direction = action.payload;
        }
    }
})

export const {setLang} = Localization.actions;
export const {setDirection} = Localization.actions;

export default Localization.reducer;