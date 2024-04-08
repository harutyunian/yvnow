import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilters} from "../../../types/event.type";

const initialState:IFilters[] = []

export const filterReduce = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(_,action:PayloadAction<IFilters[]>){
            return action.payload
        }
    }
})

export const {setFilters} = filterReduce.actions
export default filterReduce.reducer
