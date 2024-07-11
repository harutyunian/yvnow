import React, {useState, useEffect, useMemo} from "react";
import {View, StyleSheet} from "react-native";
import {PROVIDER_GOOGLE} from "react-native-maps";
import MapView from "react-native-map-clustering";
import CustomMarker from "./MapMarker/CustomMarker";
import {aubergine} from "./mapStyles/aubergine";
import {IEventCart, IFilters} from "../../types/event.type";
import {useAppSelector} from "../../hook/reduxHooks";
import {FilterAction, FilterActionType} from "../FiltersActionsSheet/FilterActionsSheet";
import {DARK} from "../../store/reducer/types";
import {standard} from "./mapStyles/standard";
import BottomSheetFilters from "../ButtomSheetFilters/ButtomSheetFilters";
import {TodayTabs} from "../../types/filter.type";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import {FilterService} from "../../services/FilterService/FilterService";
import {removeDuplicatesByValues, uniqForMapMarker} from "../../helpers/helper";


export type locationType = { latitude: number; longitude: number } | null
export default function CustomMap() {
    //Yerevan coordinates
    const coordinates = {lat: 40.1680387, lng: 44.5057575};
    const colors = useAppSelector(state => state.theme)
    const filters = useAppSelector(state => state.filters)
    const events = useAppSelector(state => state.events)

    const [topFilter, setTopFilter] = useState<TodayTabs>(TodayButtons.all) // Top part filters state
    const [bottomFilter, setBottomFilter] = useState<FilterActionType>(FilterAction.all) // Bottom part filter state
    const [subFilter, setSubFilter] = useState<IFilters[]>(filters || []) // Sub filters
    const [uniqEvents, setUniqEvents] = useState<IEventCart[]>(events)


    const topFilteredEvents = useMemo(() => {
        return FilterService.topFilter(uniqEvents, topFilter)
    }, [topFilter, uniqEvents])

    const bottomFilteredEvents = useMemo(() => {
        const {eventLists} = FilterService.bottomFilteredEvents(topFilteredEvents, bottomFilter)
        return eventLists
    }, [topFilteredEvents, bottomFilter])

    const subFilteredEvents = useMemo(() => {
        return FilterService.subFilter(bottomFilteredEvents, subFilter)
    }, [bottomFilteredEvents, subFilter])

    useEffect(() => {
        const uniqs = uniqForMapMarker(events);
        setUniqEvents(uniqs)
    }, [events]);

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
            <BottomSheetFilters {...{
                topFilter,
                subFilter: filters,
                setSubFilter,
                setTopFilter,
                setBottomFilter
            }}/>
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
