import React, {useState, useEffect, useMemo} from "react";
import {View, StyleSheet,} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import CustomMarker from "./MapMarker/CustomMarker";
import {aubergine} from "./mapStyles/aubergine";
import {IEventCart, IFilters} from "../../types/event.type";
import {EventService} from "../../services/EventService/EventService";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {FilterAction,  FilterActionType} from "../FiltersActionsSheet/FilterActionsSheet";
import {setFilters} from "../../store/reducer/filter/filterReducer";
import {DARK} from "../../store/reducer/types";
import {standard} from "./mapStyles/standard";
import BottomSheetFilters from "../ButtomSheetFilters/ButtomSheetFilters";
import {TodayTabs} from "../../types/filter.type";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import {FilterService} from "../../services/FilterService/FilterService";



export type locationType = { latitude: number; longitude: number } | null
export default function CustomMap() {
    //Yerevan coordinates
    const coordinates = {lat: 40.1680387, lng: 44.5057575};

    const [events, setEvents] = useState<IEventCart[]>([]);
    const [topFilter, setTopFilter] = useState<TodayTabs>(TodayButtons.all) // Top part filters state
    const [bottomFilter, setBottomFilter] = useState<FilterActionType>(FilterAction.all) // Bottom part filter state
    const [subFilter, setSubFilter] = useState<IFilters[]>([]) // Sub filters

    const colors = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()



    useEffect(() => {
        (async function () {
            try {
                const eventService = new EventService();
                const result = await eventService.toDaysEvents(1, 100);
                setEvents(result.events);
            } catch (e: any) {
            }
        })();
    }, []);

    const topFilteredEvents = useMemo(() => {
        return FilterService.topFilter(events, topFilter)
    }, [topFilter, events])

    const bottomFilteredEvents = useMemo(() => {
        const {eventLists, uniqFilters} = FilterService.bottomFilteredEvents(topFilteredEvents, bottomFilter)
        dispatch(setFilters(uniqFilters))
        return eventLists
    }, [topFilteredEvents, bottomFilter])

    const subFilteredEvents = useMemo(() => {
        return FilterService.subFilter(bottomFilteredEvents, subFilter)
    }, [bottomFilteredEvents, subFilter])


    return (
        <View style={mapStyle.container}>
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
                customMapStyle={colors.mode === DARK ? aubergine : standard}
            >
                {subFilteredEvents.map((event,index) => {
                    return <CustomMarker key={index} {...event}/>;
                })}
            </MapView>
            <BottomSheetFilters {...{
                topFilter, setTopFilter,setBottomFilter, setSubFilter
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
