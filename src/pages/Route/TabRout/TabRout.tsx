import React from "react";
import { View,StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../../../hook/reduxHooks";
import { CalendarIcon, HomeIcon, SettingIcon } from "../../../components/Svg/Svg";
import TodayEvents from "../../TodayEvents/TodayEvents";
import CustomMap from "../../../components/Map/CustomMap";
import Settings from "../../Settings/Settings";
import EventDetails from "../../EventDetails/EventDetails";
import PartnerProfile from "../../PartnerProfile/PartnerProfile";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';



const Tab = createBottomTabNavigator();


export default function TabRoute(){
    const colors = useAppSelector(state=>state.theme)
    const { ICON: iconColor, ACCENT, PRIMARY } = colors;
    const accent_1 = ACCENT["1"];
    const accent_6 = ACCENT["6"];
    const accent_5 = ACCENT["5"];

      
    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: accent_5
      },
    }

    return <NavigationContainer theme={MyTheme}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: accent_1, // Background color of the header
        },
        cardStyle: { backgroundColor: '#yellow' },
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
      <Tab.Screen name="Today" component={TodayEvents} />
      <Tab.Screen name="Home" component={CustomMap} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Partner Profile" component={PartnerProfile}  options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Event Details" component={EventDetails}  options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  </NavigationContainer>
}

const styles = StyleSheet.create({
    icon: {
      width: 25,
      height: 25,
    },
  });
  