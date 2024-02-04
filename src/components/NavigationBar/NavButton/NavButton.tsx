import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {useTheme} from "../../../hook/themeMode";

interface INavButton extends TouchableOpacityProps {
    icon: React.ReactNode,
    isActive: boolean
}

export default function NavButton(props: INavButton) {
    const {icon, isActive = false} = props
    const color = useTheme()
    return <TouchableOpacity style={{
        ...styles.buttonContainer,
        borderBottomColor: isActive ? color.PRIMARY.MAIN : 'transparent'
    }} {...props}>{icon}</TouchableOpacity>
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 55,
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'transparent'
    }
})
