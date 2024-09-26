import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLanguages } from "../translation/translation";
import { langs } from "../translation/types";
import { Dispatch } from "redux";

export async function setInitialLang(dispatch: Dispatch) {
  try {
    type langType = langs.EN | langs.RU | langs.AM;
    const storedLang = await AsyncStorage.getItem("lang");
    const lang: langType | undefined = storedLang
      ? (storedLang as langType)
      : langs.EN;
    dispatch(setLanguages(lang));
  } catch (error) {
    console.error("Error fetching language:", error);
  }
}
