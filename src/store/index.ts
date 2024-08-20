import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eventDetailsReducer from "./reducer/eventDetails/eventDetailsReducer";
import themeReducer from "./reducer/theme/themeReducer";
import userReducer from "./reducer/user/user";
import translationReducer from "./reducer/translation/translation";
import filterReduce from "./reducer/filter/filterReducer";
import eventReducer from "./reducer/event/eventReducer";
import querySlice from "./reducer/query/querySlice";
import loaderReducer from "./reducer/loading/loadingSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  eventDetails: eventDetailsReducer,
  user: userReducer,
  translation: translationReducer,
  filters: filterReduce,
  events: eventReducer,
  query: querySlice,
  loader: loaderReducer,
});
const store = configureStore({ reducer: rootReducer });

export default store;
