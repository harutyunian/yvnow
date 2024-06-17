import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../../hook/reduxHooks";
import {ReactNode} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setDarkMode, setLightMode} from "../../../../store/reducer/theme/themeReducer";


interface IThemeSelectorProps {
    name: string,
    icon?: ReactNode,
    mode: string
}

export default function ThemeSelector(props: IThemeSelectorProps) {
    const {name, icon, mode} = props

    const dispatch = useAppDispatch()
    const color = useAppSelector(state => state.theme)
    const tc = color.ACCENT['1']


    const handleChangeMode = (nextValue: string) => {
        (async () => {
            try {
                await AsyncStorage.setItem('theme', nextValue)
            } catch (e) {
                console.log('Error getting theme:', e);
            }
        })()
        if (nextValue === 'DARK') dispatch(setDarkMode())
        else dispatch(setLightMode());
    };


    const backgroundColor = mode === color.mode ? color.PRIMARY.MAIN : color.ACCENT['1']
    return <TouchableOpacity
        onPress={() => handleChangeMode(mode)}
        style={[themeSelectorStyle.container,
            {
                borderColor: backgroundColor,
            }]}
    >{icon}
        <Text style={[themeSelectorStyle.text, {color: backgroundColor}]}>{name}</Text></TouchableOpacity>
}
const themeSelectorStyle = StyleSheet.create({
    text: {
        fontSize: 27,
        fontWeight: '900'
    },
    container: {
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'black',
        flexDirection: 'row',
        columnGap: 10,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    }
})
