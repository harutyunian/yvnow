import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps, Text} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {useTheme} from "../../../hook/themeMode";

interface INavButton extends TouchableOpacityProps {
    icon: React.ReactNode,
    isActive: boolean,
    name?: string
}

export default function NavButton(props: INavButton) {
    const {icon, isActive = false,name} = props
    const color = useTheme()
    const navigation = useNavigation()
    const switchColor = isActive ? color.PRIMARY.MAIN : color.icon

    return <TouchableOpacity style={{
        ...styles.buttonContainer
    }} {...props}>{icon}{name && <Text style={{color: switchColor}}>{name}</Text>}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'transparent'
    }
})
