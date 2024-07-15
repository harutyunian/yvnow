import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilters} from "../../../types/event.type";
import {EventTabs} from "../../../types/filter.type";
import {FilterAction, FilterActionType} from "../../../components/FiltersActionsSheet/FilterActionsSheet";
import {TodayButtons} from "../../../pages/TodayEvents/switchButtons.enum";

interface IInitialState {
    filters: IFilters[],
    selectedFilters: IFilters[],
    unselectedFilters: IFilters[],
    topFilter: EventTabs,
    bottomFilter: FilterActionType

}

const initialState: IInitialState = {
    filters: [],
    selectedFilters: [],
    unselectedFilters: [],
    topFilter: TodayButtons.all,
    bottomFilter: FilterAction.all
}

interface ISelectedFilter {
    filterType: 'add' | 'remove',
    filter: IFilters
}

interface IUnselectedFilter {
    filterType: 'add' | 'remove' | 'updateAll',
    filters: IFilters[]
}

interface IActionFilter {
    filterType: 'topFilter' | 'bottomFilter',
    actionType: EventTabs | FilterActionType
}


export const filterReduce = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<IFilters[]>) {
            if (action.payload) {
                const filters = Array.from(new Map(action.payload.map(item => [item.id, item])).values());
                return {...state, filters}
            }
            return state
        },
        setSelectedFilter(state, action: PayloadAction<ISelectedFilter>) {
            const {filterType, filter} = action.payload;
            if (filterType === 'add') {
                const newSelectedFilters = new Map(state.selectedFilters.map(f => [f.id, f]));
                newSelectedFilters.set(filter.id, filter);
                return {...state, selectedFilters: Array.from(newSelectedFilters.values())};
            } else if (filterType === 'remove') {
                const selectedFilters = state.selectedFilters.filter(({id}) => filter.id !== id);
                return {...state, selectedFilters};
            }
            return state;
        },
        setUnselectedFilters(state, action: PayloadAction<IUnselectedFilter>) {
            const {filterType, filters} = action.payload;
            if (filterType === 'updateAll') {
                const unselectedFilters = Array.from(new Map(filters.map(item => [item.id, item])).values());
                return {...state, unselectedFilters};
            } else if (filterType === 'add') {
                const newUnselectedFilters = new Map(state.unselectedFilters.map(f => [f.id, f]));
                filters.forEach(filter => newUnselectedFilters.set(filter.id, filter));
                return {...state, unselectedFilters: Array.from(newUnselectedFilters.values())};
            } else if (filterType === 'remove') {
                const unselectedFilterIds = new Set(filters.map(f => f.id));
                const unselectedFilters = state.unselectedFilters.filter(({id}) => !unselectedFilterIds.has(id));
                return {...state, unselectedFilters};
            }
            return state;
        },

        setActionFilter(state, action: PayloadAction<IActionFilter>) {
            const {filterType, actionType} = action.payload;

            if (filterType === 'topFilter') {
                return {...state, topFilter: actionType as EventTabs}
            }
            return {...state, bottomFilter: actionType as FilterActionType}
        },
        resetAllFilters(state){
            return {
                ...state,
                filters: state.filters,
                selectedFilters: [],
                unselectedFilters: state.filters,
                topFilter: TodayButtons.all,
                bottomFilter: FilterAction.all
            }
        }

    }
})

export const {
    setFilters,
    setSelectedFilter,
    setUnselectedFilters,
    setActionFilter,
    resetAllFilters
} = filterReduce.actions
export default filterReduce.reducer
