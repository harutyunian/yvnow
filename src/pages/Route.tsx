import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetails from "./EventDetails/EventDetails";
import TodayEvents from "./TodayEvents/TodayEvents";
import CustomMap from '../components/Map/CustomMap';
const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={CustomMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
