import React, {useEffect} from "react";
import {Text, View, Image, StyleSheet, ScrollView} from "react-native";
import Swiper from "react-native-swiper";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {useAppSelector} from "../../hook/reduxHooks";
import CustomerInfoCard from "./CustomerInfoCard/CustomerInfoCard";
import {customMapStyleConfigs} from "../../components/Map/customMapStyle";
import {EventService} from "../../services/EventService/EventService";

export default function EventDetails() {
    const eventDetails = useAppSelector(state => state.eventDetails)
    const colors = useAppSelector(state => state.theme)
    const text_color = colors.ACCENT['1']
    const {id, imageUrls, title, description, user: {location: {lat, lng}, address}} = eventDetails

    const sliderSettings = {
        autoplay: true,
        showsPagination: false,
        autoplayTimeout: 3,
        loop: true
    }

    useEffect(() => {
        (function () {
            try {
                const eventService = new EventService()
                eventService.addView(id)
            } catch (e) {
                console.log('something went wrong trying to add view count')
            }
        })()
    }, []);
    return (
        <ScrollView>
            <View>
                <View style={[eventDetailsStyle.sliderContainer]}>
                    <Swiper {...sliderSettings}>
                        {imageUrls.map((uri) => (
                            <View>
                                <Image
                                    key={uri}
                                    style={eventDetailsStyle.image}
                                    source={{uri}}
                                    onError={(err) => console.log(err.nativeEvent.error)}
                                />
                            </View>
                        ))}
                    </Swiper>
                </View>
                <CustomerInfoCard/>
                <View style={[eventDetailsStyle.descriptionContainer]}>
                    <View style={[eventDetailsStyle.content]}>
                        <Text style={[eventDetailsStyle.eventTitle, {color: text_color}]}>
                            {title}
                        </Text>
                        <Text style={[eventDetailsStyle.description, {color: text_color}]}>
                            {description}
                        </Text>
                    </View>
                </View>
                <View style={[eventDetailsStyle.mapConatiner]}>
                    <View style={[{width: '100%', borderStyle: 'solid', borderColor: text_color, borderWidth: 1}]}></View>
                    <Text style={[eventDetailsStyle.description, {color: text_color, left: 10}]}>Address - {address}</Text>
                    <MapView
                        initialRegion={{
                            latitude: +lat,
                            longitude: +lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={[eventDetailsStyle.map]}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={customMapStyleConfigs}
                    >
                        <Marker coordinate={{latitude: +lat, longitude: +lng}}/>
                    </MapView>
                </View>
            </View>
        </ScrollView>
    );
}
const eventDetailsStyle = StyleSheet.create({
    image: {
        width: "100%",
        height: 340,
    },
    mapConatiner: {
        width: '100%',
        height: 400,
        display: 'flex',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: 300
    },
    sliderContainer: {
        width: "100%",
        height: 340,
    },
    wrapper: {},
    slider: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionContainer: {
        display: "flex",
        alignItems: "center",
    },
    content: {
        width: "90%",
    },
    eventTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "rgb(51, 51, 51)",
    },
    description: {
        fontSize: 14,
        fontWeight: "400",
        top: 14,
    },
});
