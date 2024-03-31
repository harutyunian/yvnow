import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { setDarkMode, setLightMode } from "../store/reducer/theme/themeReducer";

function isAfter8pm(): boolean {
  const currentHour = new Date().getHours();
  return currentHour >= 20 || currentHour < 8;
}

export const useTheme = () => {
  const colors = useAppSelector((state) => state.theme);
  const { mode } = colors;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (mode === "DYNAMIC") {
      const result = isAfter8pm();
      if (result) dispatch(setDarkMode());
      else dispatch(setLightMode());
    }
    if(mode === 'DARK'){
        dispatch(setDarkMode());
    }

    if(mode == 'LIGHT'){
        dispatch(setLightMode());
    }
  }, [mode,dispatch]);

  return colors;
};
