import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "../../Settings/Settings";
import CustomMap from "../../../components/Map/CustomMap";
import TodayEvents from "../../TodayEvents/TodayEvents";
import PartnerProfile from "../../PartnerProfile/PartnerProfile";
import EventDetails from "../../EventDetails/EventDetails";
import {useAppSelector} from "../../../hook/reduxHooks";
import {useTranslatedRoutes} from "../../../hook/translatedRoutes";

const Stack = createNativeStackNavigator();

function useOptions() {
    const colors = useAppSelector(state => state.theme)
    const {ACCENT} = colors;
    const accent_1 = ACCENT["1"];
    const accent_5 = ACCENT["5"];
    return {
        headerStyle: {
            backgroundColor: accent_5,
        },
        headerTitleStyle: {
            fontWeight: '900'
        },
        headerTintColor: accent_1,
        tabBarStyle: {
            backgroundColor: accent_5,
        }
    }
}
export function TodayEventStackScreen() {
    const screenOptionsSettings = useOptions()
    const routes = useTranslatedRoutes()
    return (
        <Stack.Navigator
            screenOptions={() => ({
                ...screenOptionsSettings
            })}
        >
            <Stack.Screen name={routes.today.key} options={{title: routes.today.name}} component={TodayEvents}/>
            <Stack.Screen name={routes.eventDetails.key} options={{title: routes.eventDetails.name}} component={EventDetails}/>
        </Stack.Navigator>
    );
}

export function MapStackScreen() {
    const screenOptionsSettings = useOptions()
    const routes = useTranslatedRoutes()

    return (
        <Stack.Navigator
            screenOptions={() => ({...screenOptionsSettings})}
        >
            <Stack.Screen name={routes.map.key} options={{title: routes.map.name}} component={CustomMap}/>
            <Stack.Screen name={routes.partnerProfile.key} options={{title: routes.partnerProfile.name}} component={PartnerProfile}/>
            <Stack.Screen name={routes.eventDetails.key} options={{title: routes.eventDetails.name}} component={EventDetails}/>
        </Stack.Navigator>
    );
}

export function SettingsStackScreen() {
    const screenOptionsSettings = useOptions()
    const routes = useTranslatedRoutes()

    return (
        <Stack.Navigator
            screenOptions={() => ({
                ...screenOptionsSettings
            })}
        >
            <Stack.Screen name={routes.settings.key} options={{title: routes.settings.name}} component={Settings}/>
        </Stack.Navigator>
    );
}

