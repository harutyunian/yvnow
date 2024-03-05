import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./reduxHooks";
import { setDarkMode, setLightMode } from "../store/reducer/themeReducer";
import { useSelector } from "react-redux";

function isAfter8pm(): boolean {
    const currentHour = new Date().getHours();
    return currentHour >= 20 || currentHour < 8;
}

export const useTheme = () => {
    const colors = useAppSelector((state)=>state.theme)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const result = isAfter8pm();
        if (result) dispatch(setDarkMode())
        else dispatch(setLightMode())
    }, [])

    return colors
}
