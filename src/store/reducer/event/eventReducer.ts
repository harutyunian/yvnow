import {IEventCart} from "../../../types/event.type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface  IInitialState {
    events: IEventCart[] | [],
    subFilteredEvents: IEventCart[] | [],
}

const initialState: IInitialState = {
    events: [],
    subFilteredEvents: []
}


export const eventReducer = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addNewEventLists(state, action: PayloadAction<IEventCart[]>) {
            return { ...state, events: [...state.events, ...action.payload]}
        },
        setSubFilteredEvents(state, action: PayloadAction<IEventCart[]>) {
            return { ...state, subFilteredEvents: action.payload}
        }
    }
});


export const {addNewEventLists,setSubFilteredEvents} = eventReducer.actions
export default eventReducer.reducer
