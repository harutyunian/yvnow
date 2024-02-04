import {DARK, LIGHT} from "./types";
import {Dispatch} from 'redux';

export const setDarkMod = (dispatch: Dispatch) => dispatch({type: DARK})
export const setLightMode = (dispatch: Dispatch) => dispatch({type: LIGHT})
