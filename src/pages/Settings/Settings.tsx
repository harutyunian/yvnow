import React from "react";
import {View, StyleSheet} from "react-native";
import {Languages} from "./Languages/Languages";
import ThemeMode from "./ThemeMode/ThemeMode";

export default function Settings() {


    return (
        <View style={[settingsStyle.container]}>
            <Languages/>
            <ThemeMode/>
        </View>
    );
}

const settingsStyle = StyleSheet.create({
    container: {
        padding: 10,
    }
});
