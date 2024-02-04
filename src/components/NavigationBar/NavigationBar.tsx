import React, {useState} from 'react'
import {Text, View, StyleSheet} from "react-native";
import {useTheme} from "../../hook/themeMode";
import {HomeIcon, LocationNavigationIcon, SettingIcon} from "../Svg/Svg";
import NavButton from "./NavButton/NavButton";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {setDarkMod, setLightMode} from "../../store/reducer/actions";

export default function NavigationBar() {
    const colors = useTheme()
    const dispatch = useAppDispatch()
    const [activeIcon, setActiveIcon] = useState(0)
    const icons = [
        {Icon: LocationNavigationIcon, activeFill: colors.PRIMARY.MAIN, inactiveFill: colors.ICON},
        {Icon: HomeIcon, activeFill: colors.PRIMARY.MAIN, inactiveFill: colors.ICON},
        {Icon: SettingIcon, activeFill: colors.PRIMARY.MAIN, inactiveFill: colors.ICON},
    ];

    const handlePress = (index: number) => {
        setActiveIcon(index)
        if (index === 0) setDarkMod(dispatch)
        if (index === 1) setLightMode(dispatch)
    }

    return <View style={{...style.navigationBarContainer, backgroundColor: colors.ACCENT['1']}}>
        {icons.map(({Icon, activeFill, inactiveFill}, index) => (
            <NavButton
                key={index}
                icon={<Icon style={{width: 25, height: 25}} fill={activeIcon === index ? activeFill : inactiveFill}
                />}
                isActive={activeIcon === index}
                onPress={() => handlePress(index)}
            />
        ))
        }
    </View>
}

const style = StyleSheet.create({
    navigationBarContainer: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
})
