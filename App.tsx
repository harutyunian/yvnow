import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from "./src/store";
import NavigationBar from "./src/components/NavigationBar/NavigationBar";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Route from "./src/pages/Route";


export default function App() {
    return (<Provider store={store}><Route/></Provider>)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
