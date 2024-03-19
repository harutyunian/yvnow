import React from "react";
import {View, StyleSheet,} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../../../hook/reduxHooks";
import { CalendarIcon, LocationIcon, SettingIcon } from "../../../components/Svg/Svg";
import TodayEvents from "../../TodayEvents/TodayEvents";
import CustomMap from "../../../components/Map/CustomMap";
import Settings from "../../Settings/Settings";
import EventDetails from "../../EventDetails/EventDetails";
import PartnerProfile from "../../PartnerProfile/PartnerProfile";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { routes } from "../../../routes/routes";
const Tab = createBottomTabNavigator();

export default function TabRoute(){
    const colors = useAppSelector(state=>state.theme)
    const { ICON: iconColor, ACCENT, PRIMARY } = colors;
    const accent_1 = ACCENT["1"];
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
          backgroundColor: accent_5, // Background color of the header
        },
        headerTintColor: accent_1,
        tabBarStyle: {
          backgroundColor: accent_5,
        },
        tabBarIcon: ({ focused }) => {
          let iconComponent: JSX.Element | null = null;
          const focusedIcon = focused ?PRIMARY.MAIN:iconColor
          if (route.name === routes.map) {
            iconComponent = (
              <View style={[styles.locationIcon]}>
                <LocationIcon fill={focusedIcon} width={25} height={25} />
              </View>
            );
          } else if (route.name === routes.settings) {
            iconComponent = (
              <View style={[styles.icon]}>
                <SettingIcon fill={focusedIcon} />
              </View>
            );
          } else if (route.name === routes.today) {
            iconComponent = (
              <View style={[styles.icon]}>
                <CalendarIcon fill={focusedIcon} />
              </View>
            );
          }

          return iconComponent;
        },
        tabBarActiveTintColor: PRIMARY.MAIN,
        tabBarInactiveTintColor: accent_1,
      })}
    >
      <Tab.Screen name={routes.today} component={TodayEvents} />
      <Tab.Screen name={routes.map} component={CustomMap} />
      <Tab.Screen name={routes.settings} component={Settings} />
      <Tab.Screen name={routes.partnerProfile} component={PartnerProfile}  options={{ tabBarButton: () => null }} />
      <Tab.Screen name={routes.eventDetails} component={EventDetails}  options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  </NavigationContainer>
}

const styles = StyleSheet.create({
    icon: {
      width: 25,
      height: 25,
    },
    locationIcon:{
        display: 'flex',
        alignItems:'center',
        left: 5
    }
  });
