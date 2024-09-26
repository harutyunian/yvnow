import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDarkMode, setLightMode } from "../theme/themeReducer";
import { Dispatch } from "redux";

export async function setInitialThemeMode(dispatch: Dispatch): Promise<void> {
  try {
    const mode = await AsyncStorage.getItem("theme");
    if (mode) {
      switch (mode) {
        case "DARK":
          dispatch(setDarkMode());
          break;
        case "LIGHT":
          dispatch(setLightMode());
          break;
        default:
          dispatch(setDarkMode());
      }
    } else {
      dispatch(setDarkMode());
    }
  } catch (error) {
    console.error("Error fetching language:", error);
  }
}
