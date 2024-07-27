import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {Image} from "expo-image";
import {Marker, Callout} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch} from "../../../hook/reduxHooks";
import {IEventCart} from "../../../types/event.type";
import MiniProfile from "../../MiniProfile/MiniProfile";
import {setUser} from "../../../store/reducer/user/user";
import {isBetweenDates} from "../../../helpers/helper";
import {useTranslatedRoutes} from "../../../hook/translatedRoutes";
import image from "../../../../assets/images";

interface ICustomMarkerProps extends IEventCart {
}

export default React.memo(function CustomMarker(props: ICustomMarkerProps) {
    const {user, startDate, endDate} = props;
    const {location: {lat: latitude, lng: longitude}, avatar} = user;

    const dispatch = useAppDispatch();
    const navigate = useNavigation();
    const routes = useTranslatedRoutes();

    const [imageLoaded, setImageLoaded] = useState(false);
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    console.log(avatar);
    useEffect(() => {
        return () => {
            setImageLoaded(() => false);
            setAvatarLoaded(() => false)
        }
    }, [])
    const handlePressCallout = () => {
        dispatch(setUser(user));
        navigate.navigate(routes.partnerProfile.key as never);
    };
    return (
        <Marker
            coordinate={{latitude: +latitude, longitude: +longitude}}
            key={`${latitude}-${longitude}`} // Ensuring unique key
            tracksViewChanges={!imageLoaded && !avatarLoaded} // Track view changes based on image loading
        >{isBetweenDates(startDate, endDate) && (
            <View style={customMapStyle.liveContainer}>
                <Text style={customMapStyle.liveText}>Live</Text>
            </View>
        )}
            <Image
                source={image.marker_icon}
                style={customMapStyle.markerIcon}
                onLoad={() => setImageLoaded(true)} // Set image loaded state
            />
            <View style={customMapStyle.avatarContainer}>{/* Added wrapper View for avatar */}
                <Image
                    source={{uri: avatar}}
                    style={customMapStyle.partnerLogo}
                    onLoad={() => setAvatarLoaded(true)} // Set avatar loaded state
                />
            </View>
            <Callout
                tooltip
                style={customMapStyle.calloutContainer}
                onPress={handlePressCallout}
            ><MiniProfile user={user}/>
            </Callout>
        </Marker>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.user.id === nextProps.user.id &&
        prevProps.startDate === nextProps.startDate &&
        prevProps.endDate === nextProps.endDate &&
        prevProps.user.location.lat === nextProps.user.location.lat &&
        prevProps.user.location.lng === nextProps.user.location.lng &&
        prevProps.user.avatar === nextProps.user.avatar
    );
});

const customMapStyle = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    liveContainer: {
        width: 30,
        height: 15,
        left: 6.5,
        backgroundColor: "#e9b408",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    liveText: {
        fontSize: 8,
        fontWeight: "700",
        color: "red",
    },
    lottieIcon: {
        width: 45,
        height: 45,
    },
    lottieAvatar: {
        borderRadius: 1000,
        width: 22,
        height: 22,
        left: 11,
        bottom: 40,
    },
    iconContainer: {
        padding: 0,
    },
    avatarContainer: { // Added style for avatar wrapper
        borderRadius: 1000,
        overflow: "hidden",
        width: 26,
        height: 26,
        left: 5,
        bottom: 33,
    },
    partnerLogo: {
        width: "100%",
        height: "100%",
    },
    markerIcon: {
        width: 36,
        height: 36,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    calloutContainer: {
        borderRadius: 5,
    },
    calloutText: {
        fontWeight: "bold",
    },
});