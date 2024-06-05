import {Linking, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useAppSelector} from "../../hook/reduxHooks";
import {Image} from "expo-image";


interface IOpenInstagramProps {
    profile: string
}

export function OpenInstagram(props: IOpenInstagramProps) {
    const {profile} = props
    const colors = useAppSelector(state => state.theme)

    const handlePress = () => {
        const instagramUrl = `https://instagram.com/${profile}`;
        Linking.openURL(instagramUrl);
    };

    return <TouchableOpacity style={[openInstagramStyles.container]} onPress={handlePress}>
        <Image
            style={[openInstagramStyles.image]}
            {...{uri: require('./../../../assets/instagram_logo.png.webp')}}
        />
        <Text style={[{color: colors.ACCENT["1"]}]}>{profile}</Text>
    </TouchableOpacity>
}

const openInstagramStyles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.102)',
        borderRadius: 6,
        paddingBottom: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 3,
        columnGap: 5
    },
    image: {
        width: 15,
        height: 15
    }
})
