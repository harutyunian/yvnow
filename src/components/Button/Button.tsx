import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from "react-native";
interface IButtonStyled extends TouchableOpacityProps {
  text: string;
  textColor: string;
  style?: StyleProp<ViewStyle>;
}

export default function ButtonStyled(props: IButtonStyled) {
  const { text,style, textColor, ...rest } = props;
  return (
    <TouchableOpacity style={[style, styles.container]} {...rest}>
      <Text style={[{ color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

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
