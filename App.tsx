import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from "./src/store";
import NavigationBar from "./src/components/NavigationBar/NavigationBar";


export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <NavigationBar/>
                <StatusBar style="auto"/>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
