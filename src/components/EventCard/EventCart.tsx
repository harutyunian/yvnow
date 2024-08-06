import React from "react";
import {StyleSheet, TouchableOpacity, View, Text, Dimensions} from "react-native";
// import {Text} from 'tamagui'
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import dayjs from "dayjs";
import {EyeIcon} from "../Svg/Svg";
import ImageSlider from "./Slider2";
import {IEventCart} from "../../types/event.type";
import {formatNumber, isBetweenDates} from "../../helpers/helper";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {setEventDetails} from "../../store/reducer/eventDetails/eventDetailsReducer";
import {useTranslatedRoutes} from "../../hook/translatedRoutes";

interface IIEventCartProps {
    event: IEventCart;
}

const EventCart = React.memo(function (props: IIEventCartProps) {
    const {event} = props;
    const {imageUrls, view, startDate, endDate, title, user: {partner}} = event;
    const colors = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    const navigate = useNavigation();
    const routes = useTranslatedRoutes()

    const handlePressEvent = () => {
        navigate.navigate(routes.eventDetails.key as never);
        dispatch(setEventDetails(event));
    };
    const screenWidth = Dimensions.get('window').width;
    const width = screenWidth - (screenWidth * 0.1)
    const height = screenWidth / 2

    return (<TouchableOpacity
            style={[style.container, {shadowColor: colors.PRIMARY.MAIN, width, height}]}
            onPress={handlePressEvent}
        >
            {imageUrls && imageUrls.length && <ImageSlider {...{imageUrls}} />}
            <LinearGradient
                style={[style.gradient, {width, height}]}
                colors={[
                    "rgba(0, 0, 0, 0)",
                    "rgba(0, 0, 0, 0)",
                    "rgba(0, 0, 0, 0)",
                    colors.PRIMARY.MAIN,
                ]}
            >
                <View style={{...style.cartInfoContainer}}>
                    <View style={{...style.top}}>
                        <View style={{...style.date}}>
                            <Text style={{...style.dateText}}>
                                {dayjs(startDate).format("DD MMM")}
                            </Text>
                            <Text style={{...style.dateText}}>
                                {dayjs(startDate).format("HH:mm - ")}
                                {dayjs(endDate).format("HH:mm")}
                            </Text>
                        </View>
                        {isBetweenDates(startDate, endDate) && (
                            <View style={{...style.liveNow}}>
                                <Text style={{...style.liveText}}>Live</Text>
                            </View>
                        )}
                    </View>
                    <View style={{...style.description}}>
                        {partner && <Text style={{...style.eventTitle}}>{partner}</Text>}
                        <Text style={{...style.eventTitle}}>{title}</Text>
                        <View style={{...style.addressContainer, right: 5, top: 5}}>
                            <EyeIcon style={{...style.locationIcon}}/>
                            <Text style={{...style.address}}>{formatNumber(view + 1)}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
})

const main = {
    width: 600,
    height: 300,
    borderRadius: 12,
};
const style = StyleSheet.create({
    container: {...main, marginBottom: 20},
    cartInfoContainer: {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
    },
    top: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    liveText: {
        fontSize: 16,
        fontWeight: "700",
        color: "red",
    },
    liveNow: {
        width: 50,
        height: 24,
        backgroundColor: "#e9b408",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    eventInfo: {
        backgroundColor: "transparent",
    },
    addressContainer: {
        display: "flex",
        height: 17,
        flexDirection: "row",
        width: 270,
    },
    eventTitle: {
        textShadowColor: "#000",
        textShadowOffset: {width: -3, height: 3},
        textShadowRadius: 3,
        shadowOpacity: 1,
        shadowColor: '#000',
        shadowOffset: {width: 3, height: 3},
        shadowRadius: 3,
        color: "#FFF",
        fontSize: 16,
        fontWeight: "800"
    },
    locationIcon: {
        display: "flex",
        width: 21,
    },
    address: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "400",
    },
    date: {
        backgroundColor: "#6C63FF",
        borderRadius: 12,
        width: 95,
        height: 29,
        flexDirection: 'column',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    dateText: {
        fontSize: 10,
        fontWeight: "500",
        color: "#FFF",
    },
    description: {},
    gradient: {
        ...main,
        position: "absolute",
        padding: 20,
    },
});

export default EventCart
