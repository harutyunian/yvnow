import React, {useMemo} from "react";
import {Platform, StyleSheet} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useAppSelector} from "../../../hook/reduxHooks";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
    MapStackScreen,
    SettingsStackScreen,
    TodayEventStackScreen
} from "../StackRout/StackRout";
import {useTranslatedRoutes} from "../../../hook/translatedRoutes";
import {SafeAreaView} from "react-native-safe-area-context";

import AntDesign from '@expo/vector-icons/AntDesign';
import {Fontisto, Feather} from '@expo/vector-icons';

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

    const iosBottomBar = useMemo(() => {
        if (Platform.OS === 'ios') {
            return {
                paddingBottom: 0,
                paddingTop: 3,
                display: 'flex',
                alignItems: 'flex-start',
                height: 43
            }
        }
        return {}
    }, [Platform.OS])


    return <SafeAreaView style={[styles.safeAreaContainer, {backgroundColor: accent_5}]}><NavigationContainer
        theme={MyTheme}>
        <Tab.Navigator
            screenOptions={({route}) => {
                return ({
                    headerBackTitleVisible: false,
                    headerTintColor: accent_1,
                    tabBarStyle: {backgroundColor: accent_5, ...iosBottomBar},
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        let iconComponent: JSX.Element | null = null;
                        const focusedIcon = focused ? PRIMARY.MAIN : iconColor
                        if (route.name === routes.map.key) {
                            iconComponent = <Fontisto name="map-marker-alt" size={22} color={focusedIcon}/>
                        } else if (route.name === routes.settings.key) {
                            iconComponent = <Feather name="settings" size={24} color={focusedIcon}/>
                        } else if (route.name === routes.today.key) {
                            iconComponent = <AntDesign name="calendar" size={24} color={focusedIcon}/>;
                        }
                        return iconComponent;
                    },
                    tabBarAllowFontScaling: true,
                    tabBarActiveTintColor: PRIMARY.MAIN,
                    tabBarInactiveTintColor: accent_1,
                })
            }}
        >
            <Tab.Screen
                name={routes.today.key}
                options={{title: routes.today.name}}
                component={TodayEventStackScreen}
            />
            <Tab.Screen
                name={routes.map.key}
                options={{title: routes.map.name}}
                component={MapStackScreen}
            />
            <Tab.Screen
                name={routes.settings.key}
                options={{title: routes.settings.name}}
                component={SettingsStackScreen}
            />
        </Tab.Navigator>
    </NavigationContainer></SafeAreaView>
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1
    },
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
