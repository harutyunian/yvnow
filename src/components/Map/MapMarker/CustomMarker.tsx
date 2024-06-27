import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {Image} from "expo-image";
import {Marker, Callout} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import {useAppDispatch} from "../../../hook/reduxHooks";
import {IEventCart} from "../../../types/event.type";
import MiniProfile from "../../MiniProfile/MiniProfile";
import {setUser} from "../../../store/reducer/user/user";
import {isBetweenDates} from "../../../helpers/helper";
import {useTranslatedRoutes} from "../../../hook/translatedRoutes";

interface ICustomMarkerProps extends IEventCart {

}

export default function CustomMarker(props: ICustomMarkerProps) {
    const {user, startDate, endDate} = props;

    const {
        location: {lat: latitude, lng: longitude},
        avatar,
    } = user;
    const dispatch = useAppDispatch();
    const navigate = useNavigation();
    const routes = useTranslatedRoutes()

    const handlePressCallout = () => {
        dispatch(setUser(user));
        navigate.navigate(routes.partnerProfile.key as never);
    };


    return (
        <Marker coordinate={{latitude: +latitude, longitude: +longitude}}>
            {isBetweenDates(startDate, endDate) ?
                <>
                    <View style={customMapStyle.liveContainer}><Text style={customMapStyle.liveText}>Live</Text></View>
                    <LottieView
                        autoPlay
                        style={[customMapStyle.lottieIcon]}
                        source={require('./../../../../assets/lottie/animated_marker.json')}
                    />
                    <Image {...{uri: avatar}} style={[customMapStyle.lottieAvatar]}/>
                </> :
                <>
                    <Image
                        {...{uri:require("../../../../assets/icons/marker-96.png") }}
                        style={[customMapStyle.markerIcon]}
                    />
                    <Image {...{uri: avatar}} style={[customMapStyle.partnerLogo]}/>
                </>
            }

            <Callout
                tooltip
                style={[customMapStyle.calloutContainer]}
                onPress={() => handlePressCallout()}
            ><MiniProfile {...{user}} /></Callout>
        </Marker>
    );
}

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
        height: 45
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
    partnerLogo: {
        borderRadius: 1000,
        width: 26,
        height: 26,
        left: 5,
        bottom: 33,
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
