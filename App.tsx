import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import Route from "./src/pages/Route";

export default function App() {
  return (
    <Provider store={store}>
        <Route />
    </Provider>
  );
}
