import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text} from "react-native";
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import CustomMarker from "./MapMarker/CustomMarker";
import {customMapStyleConfigs} from "./customMapStyle";
import {IEventCart, IFilters} from "../../types/event.type";
import {EventService} from "../../services/EventService/EventService";
import {removeDuplicateUsers} from "../../helpers/helper";
import MapViewDirections from "react-native-maps-directions";
import {Button} from "native-base";
import {useAppSelector} from "../../hook/reduxHooks";
import {FilterActionsSheet} from "../FiltersActionsSheet/FilterActionsSheet";


enum MapSwitchButtons {
    all = 'All',
    events = 'Event',
    show = 'Show',
    concert = 'Concert'
}

type ActiveTabType =
    MapSwitchButtons.all |
    MapSwitchButtons.concert |
    MapSwitchButtons.events |
    MapSwitchButtons.show

export type locationType = { latitude: number; longitude: number } | null
export default function CustomMap() {
    //Yerevan coordinates
    const coordinates = {lat: 40.1680387, lng: 44.5057575};
    const [activeTab, setActiveTab] = useState<ActiveTabType>(MapSwitchButtons.all)
    const [events, setEvents] = useState<IEventCart[]>([]);
    const [userLocation, setUserLocation] = useState<locationType>(null);
    const [destination, setDestination] = useState<locationType>(null);
    const [setSelectedFilter,setSelectedFilters] = useState<IFilters[]>([])
    const [filteredEvents,setFilteredEvents] = useState<IEventCart[]>([])
    const colors = useAppSelector(state => state.theme)
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;


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

    const handlePressMapTabs = (type: ActiveTabType) => setActiveTab(type)
    const isAllActive = activeTab === MapSwitchButtons.all
    const isEventActive = activeTab === MapSwitchButtons.events
    const isShowActive = activeTab === MapSwitchButtons.show
    const isConcertActive = activeTab === MapSwitchButtons.concert


    return (
        <View style={mapStyle.container}>
            <View style={[mapStyle.tabsContainer]}>
                <Button
                    onPress={() => handlePressMapTabs(MapSwitchButtons.all)}
                    style={[mapStyle.buttonStyle,
                        {backgroundColor: isAllActive ? btn_active : btn_inactive}]}>
                    <Text
                        style={[{color: isAllActive ? "white" : colors.ACCENT["1"]}]}
                    >All</Text>
                </Button>
                <Button
                    onPress={() => handlePressMapTabs(MapSwitchButtons.events)}
                    style={[mapStyle.buttonStyle, {backgroundColor: isEventActive ? btn_active : btn_inactive}]}>
                    <Text
                        style={[{color: isEventActive ? "white" : colors.ACCENT["1"]}]}
                    >Events</Text>
                </Button>
                <Button
                    onPress={() => handlePressMapTabs(MapSwitchButtons.show)}
                    style={[mapStyle.buttonStyle, {backgroundColor: isShowActive ? btn_active : btn_inactive}]}>
                    <Text
                        style={[{color: isShowActive ? "white" : colors.ACCENT["1"]}]}
                    >Show</Text>
                </Button>
                <Button
                    onPress={() => handlePressMapTabs(MapSwitchButtons.concert)}
                    style={[mapStyle.buttonStyle, {backgroundColor: isConcertActive ? btn_active : btn_inactive}]}>
                    <Text
                        style={[{color: isConcertActive ? "white" : colors.ACCENT["1"]}]}
                    >Concert</Text>
                </Button>
            </View>
            <MapView
                style={mapStyle.map}
                provider={PROVIDER_GOOGLE}
                showsMyLocationButton
                showsUserLocation={true}
                mapPadding={{top: 20, right: 20, bottom: 100, left: 20}}
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
                    lineCap='butt'
                    apikey="AIzaSyDdKBO9i_C_7Q3hlOr5eEwz3ohklp7gbqg"
                    strokeWidth={8}
                    strokeColor="#1b73e8"
                />}
                {events.map((event) => {
                    return <CustomMarker key={event.id} {...event} {...{setDestination}}/>;
                })}
            </MapView>
            <View style={[mapStyle.filterContainer]}>
                    <FilterActionsSheet
                        todaysEvents={events}
                        setFilteredEvents={setFilteredEvents}
                        setSelectedFilters={setSelectedFilters}
                    />
            </View>
        </View>
    );
}

const mapStyle = StyleSheet.create({
    wrapper: {
        backgroundColor: 'yellow',
        width: "80%"
    },
    filterContainer: {
        display: 'flex',
        alignItems: "flex-start",
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    buttonStyle: {
        width: 90,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTabWrapper: {
        width: '100%',
        height: 100,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabsContainer: {
        position: 'absolute', // Position the buttons absolutely
        zIndex: 1, // Increase zIndex to bring it to the front
        paddingTop: 25,
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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
