import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Radio} from "native-base";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {
    setDarkMode,
    setDynamicsMode,
    setLightMode,
} from "../../store/reducer/theme/themeReducer";
import {Languages} from "./Languages/Languages";
import {useTranslation} from "../../hook/translationHook";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
    const [value, setValue] = useState("one");
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()
    const dispatch = useAppDispatch();


    useEffect(() => {
        (async ()=>{
            try{
                const theme = await AsyncStorage.getItem('theme')
                theme && setValue(theme)
            }catch(e){
                console.log('Error getting theme:', e);
            }
        })()
    }, []);
    const handleChangeMode = (nextValue: string) => {
        setValue(nextValue);
        (async ()=>{
            try{
                await AsyncStorage.setItem('theme', nextValue)
            }catch(e){
                console.log('Error getting theme:', e);
            }
        })()
        switch (nextValue) {
            case "two":
                return dispatch(setDarkMode());
            case "tree":
                return dispatch(setLightMode());
            default:
                return dispatch(setDynamicsMode());
        }
    };

    return (
        <View style={[settingsStyle.container]}>
            <Languages/>
            <View style={[settingsStyle.themeModeContainer]}>
                <Text style={[{color: colors.ACCENT["1"]}]}>{t('theme.theme')}</Text>
                <Radio.Group
                    name="myRadioGroup"
                    accessibilityLabel="favorite number"
                    value={value}
                    onChange={handleChangeMode}
                >
                    <Radio value="one" my="2" colorScheme="green">
                        <Text style={[{color: colors.ACCENT["1"]}]}>{t('theme.dynamic')}</Text>
                    </Radio>
                    <Radio value="two" my="2" colorScheme="green" style={[]}>
                        <Text style={[{color: colors.ACCENT["1"]}]}>{t('theme.dark')}</Text>
                    </Radio>
                    <Radio value="tree" my="2" colorScheme="green" style={[]}>
                        <Text style={[{color: colors.ACCENT["1"]}]}>{t('theme.light')}</Text>
                    </Radio>
                </Radio.Group>
            </View>
        </View>
    );
}

const settingsStyle = StyleSheet.create({
    container: {
        padding: 10,
    },
    themeModeContainer: {
        top: 70,
        padding: 10,
        borderStyle: "solid",
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 10,
    },
});
