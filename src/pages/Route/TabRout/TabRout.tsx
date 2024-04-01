import React from "react";
import {View, StyleSheet} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useAppSelector} from "../../../hook/reduxHooks";
import {CalendarIcon, LocationIcon, SettingIcon} from "../../../components/Svg/Svg";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
    MapStackScreen,
    SettingsStackScreen,
    TodayEventStackScreen
} from "../StackRout/StackRout";
import {useTranslatedRoutes} from "../../../hook/translatedRoutes";

const Tab = createBottomTabNavigator();

export default function TabRoute() {
    const routes = useTranslatedRoutes()
    const colors = useAppSelector(state => state.theme)
    const {ICON: iconColor, ACCENT, PRIMARY} = colors;
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
            screenOptions={({route}) => {
                return ({
                    headerStyle: {
                        backgroundColor: accent_5, // Background color of the header
                    },
                    headerTintColor: accent_1,
                    tabBarStyle: {
                        backgroundColor: accent_5,
                    },
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        let iconComponent: JSX.Element | null = null;
                        const focusedIcon = focused ? PRIMARY.MAIN : iconColor
                        console.log({route})
                        if (route.name === routes.map.key) {
                            iconComponent = (
                                <View style={[styles.locationIcon]}>
                                    <LocationIcon fill={focusedIcon} width={25} height={25}/>
                                </View>
                            );
                        } else if (route.name === routes.settings.key) {
                            iconComponent = (
                                <View style={[styles.icon]}>
                                    <SettingIcon fill={focusedIcon}/>
                                </View>
                            );
                        } else if (route.name === routes.today.key) {
                            iconComponent = (
                                <View style={[styles.icon]}>
                                    <CalendarIcon fill={focusedIcon}/>
                                </View>
                            );
                        }

                        return iconComponent;
                    },
                    tabBarActiveTintColor: PRIMARY.MAIN,
                    tabBarInactiveTintColor: accent_1,
                })
            }}
        >
            <Tab.Screen name={routes.today.key} options={{title: routes.today.name}} component={TodayEventStackScreen}/>
            <Tab.Screen name={routes.map.key} options={{title: routes.map.name}} component={MapStackScreen}/>
            <Tab.Screen name={routes.settings.key} options={{title: routes.settings.name}}
                        component={SettingsStackScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
}

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
    },
    locationIcon: {
        display: 'flex',
        alignItems: 'center',
        left: 5
    }
});
