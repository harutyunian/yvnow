import React, {useMemo, useEffect, useCallback} from "react";
import {View, StyleSheet} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import CustomMarker from "./MapMarker/CustomMarker";
import {aubergine} from "./mapStyles/aubergine";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {DARK} from "../../store/reducer/types";
import {standard} from "./mapStyles/standard";
import BottomSheetFilters from "../ButtomSheetFilters/ButtomSheetFilters";
import {FilterService} from "../../services/FilterService/FilterService";
import {uniqForMapMarker} from "../../helpers/helper";
import {setSubFilteredEvents} from "../../store/reducer/event/eventReducer";
import {setFilters, setUnselectedFilters} from "../../store/reducer/filter/filterReducer";

const lat1 = 40.15839363088361;
const lng1 = 44.401019811630256;
const lat2 = 40.18831582616864;
const lng2 = 44.52758789062501;

const latitudeDelta = Math.abs(lat2 - lat1) * 1.25;  // Add some padding
const longitudeDelta = Math.abs(lng2 - lng1) * 1.2;  // Add some padding

const centerLat = (lat1 + lat2) / 2;
const centerLng = (lng1 + lng2) / 2;

const initialRegion = {
    latitude: centerLat,
    longitude: centerLng,
    latitudeDelta,
    longitudeDelta,
};

export type locationType = { latitude: number; longitude: number } | null;



export default function CustomMap() {
    const dispatch = useAppDispatch();
    const {
        theme: colors,
        filters: {selectedFilters, bottomFilter, topFilter},
        events: {events}
    } = useAppSelector(state => state);
 

    // Filter events based on top filter
    const topFilteredEvents = useMemo(() => {
        return FilterService.topFilter(events, topFilter);
    }, [topFilter, events]);

    // Get bottom filtered events and dispatch filter updates
    const {eventLists, filters} = useMemo(() => {
        return FilterService.bottomFilteredEvents(topFilteredEvents, bottomFilter);
    }, [topFilteredEvents, bottomFilter]);

    useEffect(() => {
        dispatch(setFilters(filters));
        dispatch(setUnselectedFilters({
            filters,
            filterType: 'updateAll'
        }));
    }, [dispatch, filters]);

    const subFilteredEvents = useMemo(() => {
        const events = FilterService.subFilter(eventLists, selectedFilters);
        const eventsUniq = uniqForMapMarker(events);
        dispatch(setSubFilteredEvents(eventsUniq));
        return eventsUniq;
    }, [eventLists, selectedFilters, dispatch]);


    const renderMarkers = useCallback(() => {
        return subFilteredEvents.map((event,index) => (
            <CustomMarker key={index} {...event} />
        ));
    }, [subFilteredEvents]);



    return (
        <View style={mapStyle.container}>
            <MapView
                showsScale={false}
                showsTraffic={false}
                showsCompass={false}
                showsIndoors={false}
                toolbarEnabled={false}
                showsIndoorLevelPicker={false}
                style={mapStyle.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
                mapPadding={{top: 20, right: 20, bottom: 100, left: 20}}
                customMapStyle={colors.mode === DARK ? aubergine : standard}
                showsUserLocation
                showsMyLocationButton
            >
                {renderMarkers()}
            </MapView>
            <BottomSheetFilters/>
        </View>
    );
}

const mapStyle = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
