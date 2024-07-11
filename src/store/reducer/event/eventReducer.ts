import {IEventCart} from "../../../types/event.type";
import {createSlice} from "@reduxjs/toolkit";


const initialState: IEventCart[] | [] = []


export const eventReducer = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addNewEventLists(state, action) {
            return [...state, ...action.payload]
        }
    }
});


export const {addNewEventLists} = eventReducer.actions
export default eventReducer.reducer
