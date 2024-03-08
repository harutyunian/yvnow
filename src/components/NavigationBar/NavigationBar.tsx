import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hook/reduxHooks";
import {
  CalendarIcon,
  HomeIcon,
  LocationNavigationIcon,
  SettingIcon,
} from "../Svg/Svg";
import NavButton from "./NavButton/NavButton";

export default function NavigationBar() {
  const colors = useAppSelector(state=>state.theme)
  const [activeIcon, setActiveIcon] = useState(0);
  const icons = [
    {
      Icon: HomeIcon,
      activeFill: colors.PRIMARY.MAIN,
      inactiveFill: colors.ICON,
      name: "Home",
    },
    {
      Icon: LocationNavigationIcon,
      activeFill: colors.PRIMARY.MAIN,
      inactiveFill: colors.ICON,
      name: "Map",
    },
    {
      Icon: CalendarIcon,
      activeFill: colors.PRIMARY.MAIN,
      inactiveFill: colors.ICON,
      name: "Today",
    },
    {
      Icon: SettingIcon,
      activeFill: colors.PRIMARY.MAIN,
      inactiveFill: colors.ICON,
      name: "Settings",
    },
  ];

  const handlePress = (index: number) => {
    setActiveIcon(index);
  };

  return (
    <View
      style={{
        ...style.navigationBarContainer,
        backgroundColor: colors.ACCENT["1"],
      }}
    >
      {icons.map(({ Icon, activeFill, inactiveFill, name }, index) => (
        <NavButton
          name={name}
          key={index}
          icon={
            <Icon
              style={{ width: 25, height: 25 }}
              fill={activeIcon === index ? activeFill : inactiveFill}
            />
          }
          isActive={activeIcon === index}
          onPress={() => handlePress(index)}
        />
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  navigationBarContainer: {
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
