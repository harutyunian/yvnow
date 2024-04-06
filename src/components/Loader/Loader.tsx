import React from "react";
import LottieView from 'lottie-react-native';
import {useTranslation} from "../../hook/translationHook";
import {StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "../../hook/reduxHooks";

export function Loader() {
    const color = useAppSelector(state => state.theme)
    const {t} = useTranslation()

    return <View><LottieView
        autoPlay
        style={[loaderStyle.lottie]}
        source={require('./../../../assets/lottie/loading.json')}
    /><Text style={[{color: color.ACCENT['1'], left: 30, fontSize: 25}]}>{t('loading')}...</Text>
    </View>
}

const loaderStyle = StyleSheet.create({
    lottie: {
        width: 150,
        height: 150
    }
})
