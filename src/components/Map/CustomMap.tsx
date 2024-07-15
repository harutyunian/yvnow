import React, {useState, useEffect, useMemo} from "react";
import {View, StyleSheet} from "react-native";
import {PROVIDER_GOOGLE} from "react-native-maps";
import MapView from "react-native-map-clustering";
import CustomMarker from "./MapMarker/CustomMarker";
import {aubergine} from "./mapStyles/aubergine";
import {IEventCart, IFilters} from "../../types/event.type";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {FilterAction, FilterActionType} from "../FiltersActionsSheet/FilterActionsSheet";
import {DARK} from "../../store/reducer/types";
import {standard} from "./mapStyles/standard";
import BottomSheetFilters from "../ButtomSheetFilters/ButtomSheetFilters";
import {TodayTabs} from "../../types/filter.type";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import {FilterService} from "../../services/FilterService/FilterService";
import {uniqForMapMarker} from "../../helpers/helper";
import {setSubFilteredEvents} from "../../store/reducer/event/eventReducer";
import {setFilters, setUnselectedFilters} from "../../store/reducer/filter/filterReducer";


export type locationType = { latitude: number; longitude: number } | null
export default function CustomMap() {
    //Yerevan coordinates
    const coordinates = {lat: 40.1680387, lng: 44.5057575};
    const colors = useAppSelector(state => state.theme)
    const {selectedFilters, bottomFilter, topFilter} = useAppSelector(state => state.filters)
    const {events} = useAppSelector(state => state.events)

    const dispatch = useAppDispatch()

    const topFilteredEvents = useMemo(() => {
        return FilterService.topFilter(events, topFilter)
    }, [topFilter, events])

    const bottomFilteredEvents = useMemo(() => {
        const {eventLists, filters} = FilterService.bottomFilteredEvents(topFilteredEvents, bottomFilter)
        dispatch(setFilters(filters))
        dispatch(setUnselectedFilters({
            filters,
            filterType: 'updateAll'
        }))
        return eventLists
    }, [topFilteredEvents, bottomFilter])

    const subFilteredEvents = useMemo(() => {
        const events = FilterService.subFilter(bottomFilteredEvents, selectedFilters)
        dispatch(setSubFilteredEvents(events))
        return uniqForMapMarker(events)
    }, [bottomFilteredEvents, selectedFilters])

    return (
        <View style={mapStyle.container}>
            <MapView
                spiralEnabled
                // animationEnabled
                tracksViewChanges={false}
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
                customMapStyle={colors.mode === DARK ? aubergine : standard}
            >
                {subFilteredEvents.map((event, index) => {
                    return <CustomMarker key={index} {...event}/>;
                })}
            </MapView>
            <BottomSheetFilters/>
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
    textTabWrapper: {
        width: '100%',
        height: 100,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    calloutText: {
        fontWeight: "bold",
    },
});
