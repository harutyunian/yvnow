import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import { useAppSelector } from '../../hook/reduxHooks';

interface IButtonStyled extends TouchableOpacityProps {
    type: 'SECOND' | 'MAIN',
    text: string,
    size?: 'lg' | 'md' | 'sm'
}

export default function ButtonStyled(props: IButtonStyled) {
    const {type,text, size='lg'} = props;
    const colors = useAppSelector(state=>state.theme)
    return <TouchableOpacity style={{...style.container, backgroundColor: colors.PRIMARY[type], ...style[size]}}><Text style={{...style.text}}>{text}</Text></TouchableOpacity>
}

const style = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lg:{
        borderRadius: 25,
        width: 295,
        height: 50
    },
    md: {
        borderRadius: 25,
        width: 238,
        height: 50
    },
    sm:{
        borderRadius: 17.5,
        width: 85,
        height: 35
    },
    text:{
        fontWeight: '700',
        fontSize: 16,
        color: 'white',
    }
})
