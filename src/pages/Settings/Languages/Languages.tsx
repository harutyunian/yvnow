import {StyleSheet, View} from "react-native";
import {Language} from "./Language/Language";
import {Radio} from "native-base";
import {useAppDispatch, useAppSelector} from "../../../hook/reduxHooks";
import {setLanguages} from "../../../store/reducer/translation/translation";
import {langs} from "../../../store/reducer/translation/types";

export function Languages() {
    const {lang} = useAppSelector(state=>state.translation)
    const dispatch = useAppDispatch()
    const handleLanguageChange = (nextValue: string) => {
        dispatch(setLanguages(nextValue as langs));
    }
    return <View style={[languagesStyle.container]}>
        <Radio.Group value={lang} name='languages' onChange={handleLanguageChange} aria-label='languages'>
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
        </Radio.Group>
    </View>
}

const languagesStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    }
})
