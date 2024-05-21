import {createSlice} from "@reduxjs/toolkit";
import {DARK} from "../types";
import {styles} from "../../../constants/styles";
import { isAfter8pm } from "../../../helpers/helper";
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
    FILTER_COLOR: string
};
interface IInitialState extends Theme {
    mode?: 'DARK' | 'LIGHT' | 'DYNAMIC'
}

const initialState:IInitialState = {
    ...styles.DARK,
    mode: DARK
}

export const themeReducer = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        setDarkMode(){
            return {
                ...styles.DARK,
                mode: 'DARK'
            }
        },
        setLightMode(){
            return {
                ...styles.LIGHT,
                mode: 'LIGHT'
            }
        },
        setDynamicsMode(){
            const result = isAfter8pm()
            if(result){
                return { ...styles.DARK, mode: 'DYNAMIC'}
            }
            return   { ...styles.LIGHT,  mode: 'DYNAMIC'}
        }
    }
})
export const {setDarkMode, setLightMode,setDynamicsMode} = themeReducer.actions

export default themeReducer.reducer;

