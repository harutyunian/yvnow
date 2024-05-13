import React from "react";
import {View, StyleSheet, Text} from "react-native";
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
import {SafeAreaView} from "react-native-safe-area-context";
import {BlurView} from "expo-blur";

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

    return <SafeAreaView style={[styles.safeAreaContainer, {backgroundColor: accent_5}]}><NavigationContainer
        theme={MyTheme}>
        <Tab.Navigator
            screenOptions={({route}) => {
                return ({
                    tabBarOptions: {
                        labelStyle: {
                            fontSize: 50,
                        },
                    },
                    tabBarLabel: ({focused, children}) => <Text style={{
                        color: focused ? PRIMARY.MAIN : accent_1,
                        top: 30,
                    }}>{children}</Text>,
                    headerStyle: {
                        backgroundColor: accent_5, // Background color of the header
                    },
                    headerTintColor: accent_1,
                    tabBarStyle: {
                        height: 50,
                        position: 'absolute',
                        borderTopColor: 'transparent',
                        borderTopWidth: 2,
                        fontSize: 40,
                        backgroundColor: 'transparent',
                    },
                    tabBarBackground: () => {
                        return <BlurView
                            style={{height: 100}}
                        ></BlurView>
                    },
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        let iconComponent: JSX.Element | null = null;
                        const focusedIcon = focused ? PRIMARY.MAIN : iconColor
                        if (route.name === routes.map.key) {
                            iconComponent = (
                                <View style={[styles.locationIcon,{top:20}]}>
                                    <LocationIcon fill={focusedIcon} width={33} height={33}/>
                                </View>
                            );
                        } else if (route.name === routes.settings.key) {
                            iconComponent = (
                                <View style={[styles.icon, {left: 2.5, top: 20}]}>
                                    <SettingIcon fill={focusedIcon}/>
                                </View>
                            );
                        } else if (route.name === routes.today.key) {
                            iconComponent = (
                                <View style={[styles.icon, {left: 6, top: 20}]}>
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
            <Tab.Screen name={routes.today.key} options={{title: routes.today.name}}
                        component={TodayEventStackScreen}/>
            <Tab.Screen name={routes.map.key} options={{title: routes.map.name}} component={MapStackScreen}/>
            <Tab.Screen name={routes.settings.key} options={{title: routes.settings.name}}
                        component={SettingsStackScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1
    },
    blur: {
        flex: 1,
        padding: 20,
        margin: 16,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20,
    },
    icon: {
        top: 3,
        left: 3,
        width: 33,
        height: 33,
    },
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationIcon: {
        top: 8,
        display: 'flex',
        alignItems: 'center',
        left: 10
    }
});
