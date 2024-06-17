import {useAppSelector} from "../../hook/reduxHooks";
import {Text} from "react-native";
import {OpenInstagram} from "./OpenInstagram/OpenInstagram";
import React from "react";
import CallByPhoneNumber from "./CallByPhoneNumber/CallByPhoneNumber";

export function HighlightsContacts({text}: { text: string }) {
    const colors = useAppSelector(state => state.theme);
    const instagramRegex = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([\w.-]+)\/?(?:\?[\w=&]*)?/g;
    const phoneNumberRegex = /<\[(.*?)\]>/g;

    return text.split(instagramRegex).map((part, index) => {
        if (index % 2 === 0) {
            const parts = part.split(phoneNumberRegex).map((subPart, subIndex) => {
                if (subIndex % 2 === 0) {
                    return <Text key={subIndex} style={{ color: colors.ACCENT["1"], fontSize: 16, fontWeight: '400' }}>{subPart}</Text>;
                } else {
                    return <CallByPhoneNumber phoneNumber={subPart}/>
                }
            });
            return <>{parts}</>;
        } else {
            return <OpenInstagram profile={part} key={index} />;
        }
    });
}
