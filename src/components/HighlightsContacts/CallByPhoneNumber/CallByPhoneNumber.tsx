import {Linking, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Image} from 'expo-image'
import {useAppSelector} from "../../../hook/reduxHooks";
import image from "../../../../assets/images";

interface ICallByPhoneNumberProps {
    phoneNumber: string
}

export default function CallByPhoneNumber(props: ICallByPhoneNumberProps) {
    const {phoneNumber} = props
    const colors = useAppSelector(state => state.theme)

    const handlePress = async () => {
        const url = `tel:${phoneNumber}`;
        await Linking.canOpenURL(url);
    };
    return <TouchableOpacity style={callByPhoneStyle.container} onPress={handlePress}>
        <Image
            style={[callByPhoneStyle.image]}
            source={image.phone_icon}
        />
        <Text style={[{color: colors.ACCENT["1"]}]}>{phoneNumber}</Text>
    </TouchableOpacity>
}

const callByPhoneStyle = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.102)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 3,
        columnGap: 5
    },
    image: {
        width: 15,
        height: 15,
    }
})
