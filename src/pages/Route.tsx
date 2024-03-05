import React from "react";
import { StyleSheet, View, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomMap from "../components/Map/CustomMap";
import { CalendarIcon, HomeIcon, SettingIcon } from "../components/Svg/Svg";
import { useTheme } from "../hook/themeMode";
import Settings from "./Settings/Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Route() {
  const colors = useTheme();
  const { ICON: iconColor, ACCENT, PRIMARY } = colors;
  const accent_1 = ACCENT["1"];
  const accent_6 = ACCENT["6"];
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: accent_1, // Background color of the header
          },
          headerTintColor: accent_6,
          tabBarStyle: {
            backgroundColor: accent_1,
          },
          tabBarIcon: () => {
            let iconComponent: JSX.Element | null = null;
            if (route.name === "Home") {
              iconComponent = (
                <View style={[styles.icon]}>
                  <HomeIcon fill={iconColor} />
                </View>
              );
            } else if (route.name === "Settings") {
              iconComponent = (
                <View style={[styles.icon]}>
                  <SettingIcon fill={iconColor} />
                </View>
              );
            } else if (route.name === "Today") {
              iconComponent = (
                <View style={[styles.icon]}>
                  <CalendarIcon fill={iconColor} />
                </View>
              );
            }

            return iconComponent;
          },
          tabBarActiveTintColor: PRIMARY.MAIN,
          tabBarInactiveTintColor: accent_6,
        })}
      >
        {/* <Tab.Screen name="Home" component={CustomMap} />*/}
        <Tab.Screen name="Today" component={CustomMap} /> 
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
