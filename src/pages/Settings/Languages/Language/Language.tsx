import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAppSelector} from "../../../../hook/reduxHooks";

interface ILanguageProps {
    lang: string,
    flagPath: any,
    radioValue: string,
    handleLanguageChange: (nextValue: string) => void
}

export function Language(props: ILanguageProps) {
    const {lang, flagPath, radioValue, handleLanguageChange} = props
    const {lang: selectedLanguage} = useAppSelector(state => state.translation)
    const colors = useAppSelector(state => state.theme)
    const bg = colors.ACCENT['6']
    const tc = colors.ACCENT['1']

    const onLangPress = () => {
        handleLanguageChange(radioValue)
    }

    const background = selectedLanguage === radioValue ? colors.PRIMARY.MAIN : bg

    return <TouchableOpacity onPress={onLangPress} style={[languageStyle.container, {backgroundColor: background}]}>
        <View style={languageStyle.wrapper}>
            <Image style={[languageStyle.flag]} source={flagPath} resizeMode='cover'/>
            <Text style={[{color: tc}, languageStyle.text]}>{lang}</Text>
        </View>
    </TouchableOpacity>
}

const languageStyle = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16
    },
    radio: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    },
    flag: {
        width: 30,
        height: 24,
        borderRadius: 25
    },
    container: {
        marginVertical: 10,
        width: "100%",
        height: 56,
        borderRadius: 26,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    }
})
