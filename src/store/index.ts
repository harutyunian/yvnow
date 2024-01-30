import { combineReducers, createStore, applyMiddleware } from 'redux';
import themeReducer from "./reducer/themeReducer";
import { composeWithDevTools } from 'redux-devtools-extension';



const rootReducer = combineReducers({
    themeReducer,
});
const middleware:any = []

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
export {store}
