import React, {useState} from "react";
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

export default function Settings() {
    const [value, setValue] = useState("one");
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()
    const dispatch = useAppDispatch();

    const handleChangeMode = (nextValue: string) => {
        setValue(nextValue);
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
                        <Text style={[{color: colors.ACCENT["1"]}]}>{t('theme.dark')}</Text>
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
        padding: 10,
        borderStyle: "solid",
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 10,
    },
});
