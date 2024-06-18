import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Entypo} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {useTranslation} from "../../../hook/translationHook";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import {useAppSelector} from "../../../hook/reduxHooks";

export default function ThemeMode() {
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()


    return <View style={[themeModeStyle.container]}>
        <Text style={[{color: colors.ACCENT["1"]}]}>{t('theme.theme')}</Text>
        <ThemeSelector
            name={t('theme.dark')}
            mode='DARK'
            icon={<Entypo name="moon" size={30} color={'DARK' === colors.mode ? colors.PRIMARY.MAIN : colors.ACCENT['1']}/>}
        />
        <ThemeSelector
            name={t('theme.light')}
            mode='LIGHT'
            icon={<MaterialIcons name="sunny" size={30} color={'DARK' !== colors.mode ? colors.PRIMARY.MAIN : colors.ACCENT['1']}/>
        }
        />
    </View>
}

const themeModeStyle = StyleSheet.create({
    container: {
        padding: 10,
        rowGap: 20
    }
})
