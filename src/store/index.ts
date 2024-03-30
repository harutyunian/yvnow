import { combineReducers, configureStore } from '@reduxjs/toolkit';
import eventDetailsReducer from './reducer/eventDetails/eventDetailsReducer';
import themeReducer from "./reducer/theme/themeReducer";
import userReducer from './reducer/user/user';
import translationReducer from "./reducer/translation/translation";


const rootReducer = combineReducers({
    theme: themeReducer,
    eventDetails: eventDetailsReducer,
    user: userReducer,
    translation: translationReducer
});
const store = configureStore({
    reducer: rootReducer
  });

 export default store;
