import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilters} from "../../../types/event.type";

const initialState: IFilters[] = []

export const filterReduce = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<IFilters[]>) {
            if (action.payload) {
                const filters = [...state, ...action.payload];
                return Array.from(new Map(filters.map(item => [item.id, item])).values());
            }
            return state
        }
    }
})

export const {setFilters} = filterReduce.actions
export default filterReduce.reducer
