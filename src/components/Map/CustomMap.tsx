import React, {useState, useEffect, useMemo} from "react";
import {View, StyleSheet, Text} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import CustomMarker from "./MapMarker/CustomMarker";
import {aubergine} from "./mapStyles/aubergine";
import {IEventCart, IFilters} from "../../types/event.type";
import {EventService} from "../../services/EventService/EventService";
import {
    compareArrayObjects,
    isBetweenDates, isDateGreaterThanEndOfDay, isIncludedToday,
    removeDuplicatesByValues,
    removeDuplicateUsers
} from "../../helpers/helper";
import {Button} from "native-base";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {FilterAction, FilterActionsSheet, FilterActionType} from "../FiltersActionsSheet/FilterActionsSheet";
import {useTranslation} from "../../hook/translationHook";
import {setFilters} from "../../store/reducer/filter/filterReducer";


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

    const [events, setEvents] = useState<IEventCart[]>([]);
    const [topFilter, setTopFilter] = useState<ActiveTabType>(MapSwitchButtons.all) // Top part filters state
    const [bottomFilter, setBottomFilter] = useState<FilterActionType>(FilterAction.all) // Bottom part filter state
    const [subFilter, setSubFilter] = useState<IFilters[]>([]) // Sub filters

    const colors = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()

    const {t} = useTranslation()
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;


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
        if (topFilter === MapSwitchButtons.all) {
            return events
        }
        return events.filter(({type}) => type.toLowerCase() === topFilter.toLowerCase())
    }, [topFilter, events])

    const bottomFilteredEvents = useMemo(() => {
        let eventLists = topFilteredEvents
        if (bottomFilter === FilterAction.live) {
            eventLists =  topFilteredEvents.filter((event) => {
                const {startDate, endDate} = event
                return isBetweenDates(startDate, endDate)
            })
        } else if (bottomFilter === FilterAction.upcoming) {
            eventLists =  topFilteredEvents.filter((event) => {
                const {startDate} = event
                return isDateGreaterThanEndOfDay(startDate)
            })
        }else if(bottomFilter === FilterAction.today){
            eventLists =  topFilteredEvents.filter((event) => {
                const {startDate} = event
                return isIncludedToday(startDate)
            })
        }
        const filters = eventLists.reduce((acc, event) => {
            if (!event.filters) return acc
            return [...acc, ...event.filters]
        }, [] as IFilters[])

        // removing duplicates for staying filters which included event
        const uniqFilters = removeDuplicatesByValues<IFilters>(filters, 'id')
        dispatch(setFilters(uniqFilters))
        return eventLists
    }, [topFilteredEvents, bottomFilter])

    const subFilteredEvents = useMemo(() => {
        if(subFilter.length){
            return bottomFilteredEvents.filter(({filters})=>{
                return   compareArrayObjects(filters, subFilter, "id")
            })
        }
        return removeDuplicateUsers(bottomFilteredEvents)
    }, [bottomFilteredEvents, subFilter])

    const handlePressMapTabs = (type: ActiveTabType) =>  setTopFilter(type)

    const isAllActive = topFilter === MapSwitchButtons.all
    const isEventActive = topFilter === MapSwitchButtons.events
    const isShowActive = topFilter === MapSwitchButtons.show
    const isConcertActive = topFilter === MapSwitchButtons.concert


    return (
        <View style={mapStyle.container}>
            <View style={[mapStyle.tabsContainer]}>
                <Button
                    onPress={() => handlePressMapTabs(MapSwitchButtons.all)}
                    style={[mapStyle.buttonStyle,
                        {backgroundColor: isAllActive ? btn_active : btn_inactive}]}>
                    <Text
                        style={[{color: isAllActive ? "white" : colors.ACCENT["1"]}]}
                    >{t('types.all')}</Text>
                </Button>
                <Button
                    onPress={() => handlePressMapTabs(MapSwitchButtons.events)}
                    style={[mapStyle.buttonStyle, {backgroundColor: isEventActive ? btn_active : btn_inactive}]}>
                    <Text
                        style={[{color: isEventActive ? "white" : colors.ACCENT["1"]}]}
                    >{t('types.event')}</Text>
                </Button>
                <Button
                    onPress={() => handlePressMapTabs(MapSwitchButtons.show)}
                    style={[mapStyle.buttonStyle, {backgroundColor: isShowActive ? btn_active : btn_inactive}]}>
                    <Text
                        style={[{color: isShowActive ? "white" : colors.ACCENT["1"]}]}
                    >{t('types.show')}</Text>
                </Button>
                <Button
                    onPress={() => handlePressMapTabs(MapSwitchButtons.concert)}
                    style={[mapStyle.buttonStyle, {backgroundColor: isConcertActive ? btn_active : btn_inactive}]}>
                    <Text
                        style={[{color: isConcertActive ? "white" : colors.ACCENT["1"]}]}
                    >{t('types.concert')}</Text>
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
                customMapStyle={aubergine}
            >
                {subFilteredEvents.map((event) => {
                    return <CustomMarker key={event.id} {...event}/>;
                })}
            </MapView>
            <View style={[mapStyle.filterContainer]}>
                <FilterActionsSheet
                    {...{setBottomFilter,setSubFilter}}
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
