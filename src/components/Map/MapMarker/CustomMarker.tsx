import React from "react";
import {StyleSheet, Image} from "react-native";
import {Marker, Callout} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import {useAppDispatch} from "../../../hook/reduxHooks";
import {IEventCart} from "../../../types/event.type";
import MiniProfile from "../../MiniProfile/MiniProfile";
import {setUser} from "../../../store/reducer/user/user";
import {routes} from "../../../routes/routes";
import {isBetweenDates} from "../../../helpers/helper";

export default function CustomMarker(props: IEventCart) {
    const {user, startDate, endDate} = props;
    const {
        location: {lat: latitude, lng: longitude},
        avatar,
    } = user;
    const dispatch = useAppDispatch();
    const navigate = useNavigation();

    const handlePressCallout = () => {
        dispatch(setUser(user));
        navigate.navigate(routes.partnerProfile as never);
    };

    return (
        <Marker coordinate={{latitude: +latitude, longitude: +longitude}}>
            {isBetweenDates(startDate, endDate)?
                <>
                    <LottieView
                        autoPlay
                        style={[customMapStyle.lottieIcon]}
                        source={require('./../../../../assets/lottie/animated_marker.json')}
                    />
                    <Image source={{uri: avatar}} style={[customMapStyle.lottieAvatar]}/>
                </>:
                <>
                    <Image
                        source={require("../../../../assets/icons/marker-96.png")}
                        style={[customMapStyle.markerIcon]}
                    />
                    <Image source={{uri: avatar}} style={[customMapStyle.partnerLogo]}/>
                </>
            }
            <Callout
                tooltip
                style={[customMapStyle.calloutContainer]}
                onPress={() => handlePressCallout()}
            >
                <MiniProfile {...{user}} />
            </Callout>
        </Marker>
    );
}

const customMapStyle = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    lottieIcon:{
        width: 45,
        height: 45
    },
    lottieAvatar:{
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
