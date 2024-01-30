import {Reducer} from 'redux';
import {DARK, LIGHT} from "./types";
import {styles} from "../../constants/styles";


const initialState = {
    mode: styles.DARK,
};

interface themeReducerState  {
    mode: typeof styles.LIGHT | typeof styles.DARK
}

interface CounterAction {
    type: string
}

const themeReducer: Reducer<themeReducerState, CounterAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case DARK:
            return {...state, mode: styles.DARK};
        case LIGHT:
            return {...state, mode: styles.LIGHT};
        default:
            return state;
    }
};
export default themeReducer;

