import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetails from "./EventDetails/EventDetails";
import TodayEvents from "./TodayEvents/TodayEvents";
const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={EventDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
