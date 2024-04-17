import {useAppSelector} from "../../hook/reduxHooks";
import {Text} from "react-native";
import {OpenInstagram} from "../OpenInstagram/OpenInstagram";
import React from "react";

export function wrapInstagramUsernameWithComponent(text: string) {
    const colors = useAppSelector(state => state.theme)
    const instagramRegex = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([\w.-]+)\/?(?:\?[\w=&]*)?/g;
    return text.split(instagramRegex).map((part, index) => {
        if (index % 2 === 0) {
            return <Text style={[{color: colors.ACCENT["1"], fontSize: 16, fontWeight: '400'}]}>{part}</Text>;
        } else {
            return <OpenInstagram profile={part} key={index}/>
        }
    });
}
