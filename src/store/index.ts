
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import eventDetailsReducer from './reducer/eventDetails/eventDetailsReducer';
import themeReducer from "./reducer/theme/themeReducer";
import userReducer from './reducer/user/user';


const rootReducer = combineReducers({
    theme: themeReducer,
    eventDetails: eventDetailsReducer,
    user: userReducer
});
const store = configureStore({
    reducer: rootReducer
  });

 export default store;
