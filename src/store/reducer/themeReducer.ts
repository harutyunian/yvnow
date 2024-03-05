import {createSlice} from "@reduxjs/toolkit";
import {DARK, LIGHT} from "./types";
import {styles} from "../../constants/styles";
type ColorPalette = {
    MAIN: string;
    SECOND: string;
};

type AccentPalette = {
    [key: number]: string;
};

type Theme = {
    PRIMARY: ColorPalette;
    ICON: string;
    ACCENT: AccentPalette;
};
interface IInitialState extends Theme {
    mode: 'DARK' | 'LIGHT'
}

const initialState:IInitialState = {
    ...styles.DARK,mode: DARK
}

export const themeReducer = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        setDarkMode(state){
            state =  {...styles.DARK, mode: 'DARK'}
            console.log({state})
        },
        setLightMode(state){
            state =  {...styles.LIGHT, mode: 'LIGHT'}
        }
    }
})
export const {setDarkMode, setLightMode} = themeReducer.actions

export default themeReducer.reducer;

