import {StyleSheet, Text, View} from "react-native";
import {Language} from "./Language/Language";
import {useAppDispatch, useAppSelector} from "../../../hook/reduxHooks";
import {setLanguages} from "../../../store/reducer/translation/translation";
import {langs} from "../../../store/reducer/translation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Languages() {
    const colors = useAppSelector(state => state.theme)
    const {lang: selectedLanguage} = useAppSelector(state => state.translation)

    // const bg = colors.ACCENT['6']
    const tc = colors.ACCENT['1']

    const dispatch = useAppDispatch()
    const handleLanguageChange = (nextValue: string) => {
        dispatch(setLanguages(nextValue as langs));
        (async () => {
            try {
                await AsyncStorage.setItem('lang', nextValue);
            } catch (error) {
                console.log('Error getting lang:', error);
            }
        })()
    }

    console.log(selectedLanguage);
    return <View style={[languagesStyle.container]}>
        <Text style={[languagesStyle.lang, {color: tc}]}>Languages</Text>
            <Language
                handleLanguageChange={handleLanguageChange}
                radioValue='am'
                lang='Armenian'
                flagPath={require('./../../../../assets/flags/am.gif')}
            />
            <Language
                handleLanguageChange={handleLanguageChange}
                radioValue='ru'
                lang='Russian'
                flagPath={require('./../../../../assets/flags/ru.gif')}
            />
            <Language
                handleLanguageChange={handleLanguageChange}
                radioValue='en'
                lang='English'
                flagPath={require('./../../../../assets/flags/uk.gif')}
            />
    </View>
}

const languagesStyle = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        alignItems: 'center',
        top:25,
        paddingHorizontal: 10
    },
    lang:{
        fontSize: 16,
        fontWeight: '700'
    }
})
