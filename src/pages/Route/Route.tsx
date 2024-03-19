import React, {useEffect, useState} from "react";
import { NativeBaseProvider } from "native-base";
import TabRoute from "./TabRout/TabRout";
import * as Location from 'expo-location';
import { useAppDispatch } from "../../hook/reduxHooks";
import { setDynamicsMode } from "../../store/reducer/theme/themeReducer";


export default function Route() {
  const dispatch = useAppDispatch()
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(()=>{
    dispatch(setDynamicsMode())
  },[])


  return (
    <NativeBaseProvider>
         <TabRoute/>
    </NativeBaseProvider>
  );
}

