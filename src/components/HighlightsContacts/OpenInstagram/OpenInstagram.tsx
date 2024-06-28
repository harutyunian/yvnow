import {Linking, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useAppSelector} from "../../../hook/reduxHooks";
import {Image} from "expo-image";
import image from "../../../../assets/images";

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
            source={image.instagram_logo}
        />
        <Text style={[{color: colors.ACCENT["1"]}]}>{profile}</Text>
    </TouchableOpacity>
}

const openInstagramStyles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.102)',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 3,
        paddingBottom: 1,
        borderRadius: 6,
        columnGap: 5
    },
    image: {
        height: 15,
        width: 15
    }
})
