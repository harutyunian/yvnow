import { combineReducers, createStore, applyMiddleware } from 'redux';
import themeReducer from "./reducer/themeReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    themeReducer
});
const middleware = [thunk]
const store =
    createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
export {store}
