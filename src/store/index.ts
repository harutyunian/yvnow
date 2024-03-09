
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import eventDetailsReducer from './reducer/eventDetails/eventDetailsReducer';
import themeReducer from "./reducer/theme/themeReducer";


const rootReducer = combineReducers({
    theme: themeReducer,
    eventDetails: eventDetailsReducer
});
const store = configureStore({
    reducer: rootReducer
  });

 export default store;
