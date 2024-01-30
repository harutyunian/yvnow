import {useAppDispatch, useAppSelector} from "./reduxHooks";
import {useEffect} from "react";
import {setDarkMod, setLightMode} from "../store/reducer/actions";

function isAfter8pm(): boolean {
    const currentHour = new Date().getHours();
    return currentHour >= 20 || currentHour < 8;
}

export const useTheme = () => {
    const colors = useAppSelector(state => state.themeReducer.mode)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const result = isAfter8pm();
        if (result) setDarkMod(dispatch)
        else setLightMode(dispatch)
    }, [])

    return colors
}
