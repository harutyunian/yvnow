import LottieView from "lottie-react-native";
import {StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "../../hook/reduxHooks";

export function NoData() {
    const colors = useAppSelector(state => state.theme)
    return <View style={[noDataStyle.container]}>
        <LottieView
            style={[{width: 300, height: 300}]}
            autoPlay
            source={require('./../../../assets/lottie/no_data.json')}/>
        <Text style={[{color: colors.ACCENT['1']}, noDataStyle.text]}>Ooops no event to show</Text>
    </View>
}

const noDataStyle = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        height: '75%',
    },
    text: {
        fontSize: 25
    }
})
