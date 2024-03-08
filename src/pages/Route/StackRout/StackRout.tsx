import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import EventDetails from "../../EventDetails/EventDetails";

const Stack = createNativeStackNavigator();

export default function StackRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Event Detaild" component={EventDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
