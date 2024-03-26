import React from "react";
import {StyleSheet, Image} from "react-native";
import {Marker, Callout} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch} from "../../../hook/reduxHooks";
import {IEventCart} from "../../../types/event.type";
import MiniProfile from "../../MiniProfile/MiniProfile";
import {setUser} from "../../../store/reducer/user/user";
import {routes} from "../../../routes/routes";
import Animated, {useSharedValue, useAnimatedStyle, withTiming, interpolate, withRepeat} from 'react-native-reanimated';

export default function CustomAnimatedMarker(props: IEventCart) {
    const {user} = props;
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
    const topPosition = useSharedValue(-1);

    React.useEffect(() => {
        const loopAnimation = () => {
            topPosition.value = withRepeat(withTiming(10, {duration: 600}), -1, true);
        };


        loopAnimation(); // Start the animation loop
    }, []);
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            top: interpolate(topPosition.value, [10, 40], [10, 50]),
        };
    });



    return (
        <Marker coordinate={{latitude: +latitude, longitude: +longitude}}>
            <Animated.View style={[{height: 50}, imageAnimatedStyle]}>
                <Image
                    source={require("../../../../assets/icons/marker-96.png")}
                    style={[customMapStyle.markerIcon]}
                />
                <Image source={{uri: avatar}}
                       style={[customMapStyle.animatedPartnerLogo]}
                />
            </Animated.View>
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
    iconContainer: {
        padding: 0,
    },
    animatedPartnerLogo: {
        borderRadius: 1000,
        width: 30,
        height: 30,
        left: 7,
        position: 'absolute',
        zIndex: 1,
        // bottom: -25,
    },
    partnerLogo: {
        borderRadius: 1000,
        width: 40,
        height: 40,
        left: 7,
        bottom: 35,
    },
    markerIcon: {
        // backgroundColor: 'yellow',
        width: 45,
        height: 45,
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
