import LottieView from "lottie-react-native";
import {StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "../../hook/reduxHooks";

export function NoData() {
    const colors = useAppSelector(state => state.theme)
    return <View style={[noDataStyle.container]}>
        <LottieView
            style={[{width: 250, height: 250}]}
            autoPlay
            source={require('./../../../assets/lottie/no_data.json')}/>
        <Text style={[{color: colors.ACCENT['1']}, noDataStyle.text]}>No event</Text>
    </View>
}

const noDataStyle = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        top: 30,
        height: '75%',
    },
    text: {
        fontWeight: "900",
        left: 9,
        fontSize: 25
    }
})
