import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    StyleProp,
    ViewStyle, TextStyle,
} from "react-native";
import _ from "lodash";

interface IButtonStyled extends TouchableOpacityProps {
    text: string;
    textColor: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

let renderCount = 0

const ButtonStyled = React.memo(function (props: IButtonStyled) {
    const {text, style, textColor, textStyle, ...rest} = props;
    console.log(`Button by name ${text} - `, renderCount++);
    return (
        <TouchableOpacity style={[style, styles.container]} {...rest}>
            <Text style={[{color: textColor}, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}, (prev, next) => {
    return JSON.stringify(prev) === JSON.stringify(next)
})

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    lg: {
        borderRadius: 25,
        width: 295,
        height: 50,
    },
    md: {
        borderRadius: 25,
        width: 238,
        height: 50,
    },
    sm: {
        borderRadius: 17.5,
        width: 85,
        height: 35,
    },
    text: {
        fontWeight: "700",
        fontSize: 16,
        color: "white",
        textAlign: "center", // Center-align the text
        flexWrap: "wrap",
    },
});
export default ButtonStyled
