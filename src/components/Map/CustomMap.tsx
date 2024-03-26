import React, {useState, useEffect, useMemo} from "react";
import {View, StyleSheet, Text} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import CustomMarker from "./MapMarker/CustomMarker";
import {customMapStyleConfigs} from "./customMapStyle";
import {IEventCart} from "../../types/event.type";
import {EventService} from "../../services/EventService/EventService";
import {useAppSelector} from "../../hook/reduxHooks";
import {Button} from "native-base";


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

export default function CustomMap() {
    //Yerevan coordinates
    const coordinates = {lat: 40.1680387, lng: 44.5057575};
    const [events, setEvents] = useState<IEventCart[]>([]);
    const [activeTab, setActiveTab] = useState<ActiveTabType>(MapSwitchButtons.all)
    const colors = useAppSelector(state => state.theme)
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;

    const filteredEvents = useMemo(() => {
        if (activeTab === MapSwitchButtons.all) return events
        return events.filter(({type}) =>
            type.toLowerCase() === activeTab.toLowerCase()
        )
    }, [events, activeTab])

    useEffect(() => {
        (async function () {
            try {
                const eventService = new EventService();
                const result = await eventService.toDaysEvents(1, 200);
                setEvents(result.events);
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
                initialRegion={{
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                customMapStyle={customMapStyleConfigs}
            >{
                filteredEvents.map((event) => {
                    return <CustomMarker key={event.id} {...event} />;
                })
            }
            </MapView>
        </View>
    )
}

const mapStyle = StyleSheet.create({
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
