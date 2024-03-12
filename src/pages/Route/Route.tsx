import React, { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { View } from "react-native";
import TabRoute from "./TabRout/TabRout";
import { useAppDispatch } from "../../hook/reduxHooks";
import { setDynamicsMode } from "../../store/reducer/theme/themeReducer";


export default function Route() {
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(setDynamicsMode())
  },[])


  return (
    <NativeBaseProvider>
         <TabRoute/>
    </NativeBaseProvider>
  );
}

