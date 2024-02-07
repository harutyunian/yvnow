import React, {useState} from 'react'
import {View, StyleSheet} from "react-native";
import {useTheme} from "../../hook/themeMode";
import {CalendarIcon, HomeIcon, LocationNavigationIcon, SettingIcon} from "../Svg/Svg";
import NavButton from "./NavButton/NavButton";

export default function NavigationBar() {
    const colors = useTheme()
    const [activeIcon, setActiveIcon] = useState(0)
    const icons = [
        {Icon: LocationNavigationIcon, activeFill: colors.PRIMARY.MAIN, inactiveFill: colors.ICON, name: 'Map'},
        {Icon: HomeIcon, activeFill: colors.PRIMARY.MAIN, inactiveFill: colors.ICON, name: 'Home'},
        {Icon: SettingIcon, activeFill: colors.PRIMARY.MAIN, inactiveFill: colors.ICON, name: 'Settings'},
        {Icon: CalendarIcon, activeFill: colors.PRIMARY.MAIN, inactiveFill: colors.ICON, name: 'Today'},
    ];

    const handlePress = (index: number) => {
        setActiveIcon(index)
    }

    return <View style={{...style.navigationBarContainer, backgroundColor: colors.ACCENT['1']}}>
        {icons.map(({Icon, activeFill, inactiveFill,name}, index) => (
            <NavButton
                name={name}
                key={index}
                icon={<Icon style={{width: 25, height: 25}} fill={activeIcon === index ? activeFill : inactiveFill} />}
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
