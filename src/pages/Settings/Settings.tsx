import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Radio } from "native-base";
import { useAppDispatch} from "../../hook/reduxHooks";
import {
  setDarkMode,
  setDynamicsMode,
  setLightMode,
} from "../../store/reducer/theme/themeReducer";

export default function Settings() {
  const [value, setValue] = useState("one");
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
      <View style={[settingsStyle.themeModeContainer]}>
        <Text>Theme</Text>
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={handleChangeMode}
        >
          <Radio value="one" my="2" colorScheme="green">
            Dynamic
          </Radio>
          <Radio value="two" my="2" colorScheme="green">
            Dark
          </Radio>
          <Radio value="tree" my="2" colorScheme="green">
            Light
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
