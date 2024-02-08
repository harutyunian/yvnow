import {NavigationContainer} from "@react-navigation/native";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {createStackNavigator} from "@react-navigation/stack";
import {Text} from "react-native";
import TodayEvents from "./TodayEvents/TodayEvents";
const Stack = createStackNavigator();

export default function Route() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen  name="Home" component={TodayEvents}/>
        </Stack.Navigator>
    </NavigationContainer>
}
