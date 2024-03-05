
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from "./reducer/themeReducer";


const rootReducer = combineReducers({
    theme: themeReducer
});
const store = configureStore({
    reducer: rootReducer
  });

 export default store;
