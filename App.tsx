import React from "react";
import {Provider} from "react-redux";
import store from "./src/store";
import Route from "./src/pages/Route/Route";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {

    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{flex: 1}}>
                <Route />
            </GestureHandlerRootView>
        </Provider>);
}
