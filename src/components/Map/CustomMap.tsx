import React, {useState, useEffect} from "react";
import {View, StyleSheet} from "react-native";
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import CustomMarker from "./MapMarker/CustomMarker";
import {customMapStyleConfigs} from "./customMapStyle";
import {IEventCart} from "../../types/event.type";
import {EventService} from "../../services/EventService/EventService";
import {removeDuplicateUsers} from "../../helpers/helper";
import MapViewDirections from "react-native-maps-directions";


export type locationType = { latitude: number; longitude: number } | null
export default function CustomMap() {
    //Yerevan coordinates
    const coordinates = {lat: 40.1680387, lng: 44.5057575};
    const [events, setEvents] = useState<IEventCart[]>([]);
    const [userLocation, setUserLocation] = useState<locationType>(null);
    const [destination, setDestination] = useState<locationType>(null);

    useEffect(() => {
        // Fetch user's location
        (async () => {
            try {
                const {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    throw new Error('Permission to access location was denied');
                }
                const location = await Location.getCurrentPositionAsync({});
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                console.error("Error getting user's location:", error);
            }
        })()

    }, []);

    useEffect(() => {
        (async function () {
            try {
                const eventService = new EventService();
                const result = await eventService.toDaysEvents(1, 100);
                setEvents(removeDuplicateUsers(result.events));
            } catch (e: any) {
            }
        })();
    }, []);


    return (
        <View style={mapStyle.container}>
            <MapView
                style={mapStyle.map}
                provider={PROVIDER_GOOGLE}
                showsMyLocationButton
                showsUserLocation={true}
                followsUserLocation={true}
                initialRegion={{
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={customMapStyleConfigs}
            >
                {userLocation && destination && <MapViewDirections
                    origin={userLocation}
                    destination={destination}
                    apikey="AIzaSyDdKBO9i_C_7Q3hlOr5eEwz3ohklp7gbqg"
                    strokeWidth={4}
                    strokeColor="red"
                />}
                {events.map((event) => {
                    return <CustomMarker key={event.id} {...event} {...{setDestination}}/>;
                })}
            </MapView>
        </View>
    );
}

const mapStyle = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    calloutContainer: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    },
    calloutText: {
        fontWeight: "bold",
    },
});
