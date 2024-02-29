import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Route from "./src/pages/Route";
import NavigationBar from "./src/components/NavigationBar/NavigationBar";

export default function App() {
  return (
    <Provider store={store}>
      <Route />
      <NavigationBar />
    </Provider>
  );
}
