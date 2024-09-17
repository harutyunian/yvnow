import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../../Settings/Settings";
import CustomMap from "../../../components/Map/CustomMap";
import TodayEvents from "../../TodayEvents/TodayEvents";
import PartnerProfile from "../../PartnerProfile/PartnerProfile";
import EventDetails from "../../EventDetails/EventDetails";
import { useAppSelector } from "../../../hook/reduxHooks";
import { useTranslatedRoutes } from "../../../hook/translatedRoutes";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack/src/types";

const TodayStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function useOptions() {
  const colors = useAppSelector((state) => state.theme);
  const { ACCENT } = colors;
  const accent_1 = ACCENT["1"];
  const accent_5 = ACCENT["5"];
  const accent_6 = ACCENT["6"];
  return {
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: accent_6,
    },
    // header title working find but maybe not included on typescript types
    // So I will put ts-ignores
    // headerTitleStyle: {
    //     fontWeight: '900'
    // },
    headerTintColor: accent_1,
    tabBarStyle: {
      backgroundColor: accent_5,
    },
  };
}

const useStackOptions = (): NativeStackNavigationOptions => {
  return {
    headerShown: true,
    freezeOnBlur: true,
    animation: "simple_push",
  };
};
export const TodayEventStackScreen = React.memo(
  function () {
    const screenOptionsSettings = useOptions();
    const stckOptions = useStackOptions();
    const routes = useTranslatedRoutes();

    return (
      <TodayStack.Navigator
        initialRouteName={"TodayEvents"}
        screenOptions={() => ({
          ...screenOptionsSettings,
        })}
      >
        <TodayStack.Screen
          name={routes.today.name}
          options={{
            title: routes.today.name,
            ...stckOptions,
            headerShown: false,
          }}
          component={TodayEvents}
        />
        <TodayStack.Screen
          name={routes.eventDetails.key}
          options={{ title: routes.eventDetails.name, ...stckOptions }}
          component={EventDetails}
        />
        <TodayStack.Screen
          name={routes.partnerProfile.key}
          options={{ title: routes.partnerProfile.name, ...stckOptions }}
          component={PartnerProfile}
        />
      </TodayStack.Navigator>
    );
  },
  () => true
);

export function MapStackScreen() {
  const screenOptionsSettings = useOptions();
  const stackOptions = useStackOptions();
  const routes = useTranslatedRoutes();

  return (
    <MapStack.Navigator screenOptions={() => ({ ...screenOptionsSettings })}>
      <MapStack.Screen
        name={routes.map.key}
        options={{
          title: routes.map.name,
          ...stackOptions,
          headerShown: false,
        }}
        component={CustomMap}
      />
      <MapStack.Screen
        name={routes.partnerProfile.key}
        options={{ title: routes.partnerProfile.name, ...stackOptions }}
        component={PartnerProfile}
      />
      <MapStack.Screen
        name={routes.eventDetails.key}
        options={{ title: routes.eventDetails.name, ...stackOptions }}
        component={EventDetails}
      />
    </MapStack.Navigator>
  );
}

export function SettingsStackScreen() {
  const screenOptionsSettings = useOptions();
  const stackOptions = useStackOptions();
  const routes = useTranslatedRoutes();

  return (
    <SettingsStack.Navigator
      screenOptions={() => ({
        ...screenOptionsSettings,
      })}
    >
      <SettingsStack.Screen
        name={routes.settings.key}
        options={{
          title: routes.settings.name,
          ...stackOptions,
          headerShown: false,
        }}
        component={Settings}
      />
    </SettingsStack.Navigator>
  );
}
