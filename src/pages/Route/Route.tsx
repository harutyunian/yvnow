import React, { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import TabRoute from "./TabRout/TabRout";
import { useAppDispatch } from "../../hook/reduxHooks";
import { setDarkMode } from "../../store/reducer/theme/themeReducer";
import { initFacebook } from "../../services/FacebookService/FacebookService";

export default function Route() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initFacebook();
    dispatch(setDarkMode());
  }, []);

  return (
    <NativeBaseProvider>
      <TabRoute />
    </NativeBaseProvider>
  );
}
