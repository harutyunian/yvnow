import {NavigationContainer} from "@react-navigation/native";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {createStackNavigator} from "@react-navigation/stack";
import {Text} from "react-native";
const Stack = createStackNavigator();

function YourScreenComponent() {
    return <Text>YourScreenComponentYourScreenComponent</Text>
}

export default function Route() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={YourScreenComponent}/>
        </Stack.Navigator>
    </NavigationContainer>
}
