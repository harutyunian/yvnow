import { removeDuplicatesByValues } from "../../../helpers/helper";
import { IEventCart } from "../../../types/event.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  events: IEventCart[] | [];
  subFilteredEvents: IEventCart[] | [];
}

const initialState: IInitialState = {
  events: [],
  subFilteredEvents: [],
};

export const eventReducer = createSlice({
  name: "events",
  initialState,
  reducers: {
    emptyEventList(state) {
      return { ...state, events: [] };
    },
    addEventByFilter(state, action: PayloadAction<IEventCart[]>) {
      state.events = action.payload;
    },
    addNewEventLists(state, action: PayloadAction<IEventCart[]>) {
      return {
        ...state,
        events: removeDuplicatesByValues(
          [...state.events, ...action.payload],
          "id"
        ),
      };
    },
    setSubFilteredEvents(state, action: PayloadAction<IEventCart[]>) {
      return { ...state, subFilteredEvents: action.payload };
    },
  },
});

export const {
  emptyEventList,
  addNewEventLists,
  setSubFilteredEvents,
  addEventByFilter,
} = eventReducer.actions;
export default eventReducer.reducer;
