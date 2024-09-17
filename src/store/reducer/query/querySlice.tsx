import { createSlice } from "@reduxjs/toolkit";
import { IQuery } from "../../../types/event.type";
import { TodayButtons } from "../../../pages/TodayEvents/switchButtons.enum";
import { FilterAction } from "../../../components/FiltersActionsSheet/FilterActionsSheet";

const initialState: IQuery = {
  limit: 6,
  page: 1,
  type: TodayButtons.all,
  filters: [],
  bottomFilter: FilterAction.all,
};

let i = 0;
export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    resetQuery() {
      return {
        limit: 6,
        page: 1,
        type: TodayButtons.all,
        filters: [],
        bottomFilter: FilterAction.all,
      };
    },
    setQuery(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { resetQuery, setQuery } = querySlice.actions;
export default querySlice.reducer;
