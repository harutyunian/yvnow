import React from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {useTheme} from "../../hook/themeMode";
import {LocationIcon} from "../Svg/Svg";
import ImageSlider from "./Slider2";

const images = [
    'https://st2.depositphotos.com/1112607/6059/i/450/depositphotos_60597655-stock-photo-funny-girls.jpg',
    'https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg',
    'https://images.unsplash.com/photo-1591243315780-978fd00ff9db?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ja3RhaWwlMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D'
];
export default function EventCart() {
    const colors = useTheme()

    return (<>
        <TouchableOpacity style={{...style.container}}>
            <ImageSlider/>
            <LinearGradient
                style={{...style.gradient}}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', colors.PRIMARY.MAIN]}>
                <View style={{...style.cartInfoContainer}}>
                    <View style={{...style.top}}>
                        <View style={{...style.date}}><Text style={{...style.dateText}}>22 Mar, 2022</Text></View>
                        <View style={{...style.liveNow}}><Text style={{...style.liveText}}>Live</Text></View>
                    </View>
                    <View style={{...style.description}}>
                        <Text style={{...style.eventTitle}}>Dj Oxiris xujan party</Text>
                        <View style={{...style.addressContainer}}><LocationIcon style={{...style.locationIcon}}/><Text
                            style={{...style.address}}>SAP Center at San Jose, California, USA</Text></View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    </>)
}

const main = {
    width: 335,
    height: 192,
    borderRadius: 12
}
const style = StyleSheet.create({
    container: main,
    cartInfoContainer: {
        height: '100%',
        display: "flex",
        justifyContent: 'space-between'
    },
    top: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    liveText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'red'
    },
    liveNow: {
        width: 50,
        height: 24,
        backgroundColor: '#e9b408',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    eventInfo: {
        backgroundColor: 'transparent'
    },
    addressContainer: {
        display: 'flex',
        height: 17,
        flexDirection: 'row',
        width: 270,
    },
    eventTitle: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: '700'
    },
    locationIcon: {
        display: 'flex',
        width: 21
    },
    address: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '400'
    },
    date: {
        backgroundColor: '#6C63FF',
        borderRadius: 12,
        width: 81,
        height: 24,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#FFF'
    },
    description: {},
    gradient: {
        ...main,
        position: 'absolute',
        padding: 20
    }
})
