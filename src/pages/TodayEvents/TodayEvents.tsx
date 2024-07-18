import React, {useCallback, useEffect, useMemo, useState} from "react";
import {FlashList} from "@shopify/flash-list";

import {Text, View, StyleSheet, Dimensions} from "react-native";
import LottieView from 'lottie-react-native';
import EventCart from "../../components/EventCard/EventCart";
import {EventService} from "../../services/EventService/EventService";
import {IEventCart} from "../../types/event.type";
import {Loader} from "../../components/Loader/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector,} from "../../hook/reduxHooks";
import {NoData} from "../../components/NoData/NoData";
import {setFilters, setUnselectedFilters} from "../../store/reducer/filter/filterReducer";
import {setLanguages} from "../../store/reducer/translation/translation";
import {langs} from "../../store/reducer/translation/types";
import {setDarkMode, setLightMode} from "../../store/reducer/theme/themeReducer";
import {FilterService} from "../../services/FilterService/FilterService";
import BottomSheetFilters from "../../components/ButtomSheetFilters/ButtomSheetFilters";
import {addNewEventLists, setSubFilteredEvents} from "../../store/reducer/event/eventReducer";

const screenWidth = Dimensions.get('window').width;
const width = screenWidth - (screenWidth * 0.1)
const height = screenWidth / 2

function TodayEvents() {
    const [loadMore, setLoadMore] = useState(false)
    const [isDataEmpty, setIsDataEmpty] = useState(false)

    const [todayEvents, setTodayEvents] = useState<IEventCart[]>([]); //This list we are getting from server

    // const [topFilter, setTopFilter] = useState<EventTabs>(TodayButtons.all) // Top part filters state
    // const [bottomFilter, setBottomFilter] = useState<FilterActionType>(FilterAction.all) // Bottom part filter state
    //const [subFilter, setSubFilter] = useState<IFilters[]>([]) // Sub filters


    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const dispatch = useAppDispatch()

    const {selectedFilters, topFilter, bottomFilter} = useAppSelector(state => state.filters)

    useEffect(() => {
        const fetchLanguage = async function () {
            try {
                type langType = langs.EN | langs.RU | langs.AM
                const storedLang = await AsyncStorage.getItem('lang');
                const lang: langType | undefined = storedLang ? (storedLang as langType) : langs.EN;
                dispatch(setLanguages(lang));
            } catch (error) {
                console.error('Error fetching language:', error);
            }
        };
        const setMode = async function (): Promise<void> {
            try {
                const mode = await AsyncStorage.getItem('theme');
                if (mode) {
                    switch (mode) {
                        case "DARK":
                            dispatch(setDarkMode());
                            break
                        case "LIGHT":
                            dispatch(setLightMode());
                            break
                        default:
                            dispatch(setDarkMode());
                    }
                } else {
                    dispatch(setDarkMode());
                }
            } catch (error) {
                console.error('Error fetching language:', error);
            }
        };
        //First show dynamic mode
        setMode();
        //First should be show english
        fetchLanguage();
    }, [dispatch]);


    useEffect(() => {
        setLoading(() => true);
        getEventList(page)
    }, []);

    // Top Buttons Filter
    const topFilteredEvents = useMemo(function () {
        return FilterService.topFilter(todayEvents, topFilter)
    }, [topFilter, todayEvents])


    //Middle Buttons Filter
    const bottomFilteredEvents = useMemo(function () {
        const {eventLists, filters} = FilterService.bottomFilteredEvents(topFilteredEvents, bottomFilter)
        dispatch(setFilters(filters))
        dispatch(setUnselectedFilters({
            filters,
            filterType: 'updateAll'
        }))
        return eventLists
    }, [topFilteredEvents, bottomFilter])


    //Bottom part filter
    const subFilteredEvents = useMemo(function () {
        const events = FilterService.subFilter(bottomFilteredEvents, selectedFilters)
        dispatch(setSubFilteredEvents(events))
        return events
    }, [bottomFilteredEvents, selectedFilters]);

    async function getEventList(page: number, count: number = 6) {
        setLoadMore(() => true);
        try {
            const eventService = new EventService();
            const result = await eventService.toDaysEvents(page, count);
            const {events, uniqFilters: filterList} = result
            dispatch(addNewEventLists(events))
            dispatch(setFilters(filterList))
            // dispatch(setUnselectedFilters({
            //         filters: filterList,
            //         filterType: 'updateAll'
            //     }))
            setTodayEvents(prev => [...prev, ...events]);
            setIsDataEmpty(!events.length)
        } catch (e: any) {
            if (e && e.message) {
                setErrorMessage(e.message);
            }
        } finally {
            setPage(prev => prev + 1)
            setLoadMore(() => false);
            setLoading(() => false);
        }
    }


    const handleScroll = useCallback(function () {
        if (!isDataEmpty && !loadMore) {
            getEventList(page)
        }
    }, [loadMore, isDataEmpty])

    const renderItem = useCallback(function ({item}: { item: IEventCart }) {
        return <EventCart event={item}/>
    }, [])
    const getItemLayout = useCallback((_: any, index: number) => {
        const screenWidth = Dimensions.get('window').width;
        const height = screenWidth / 2
        return {length: height, offset: height * index, index}
    }, [])

    const initialNumToRender = useMemo(() => 10, []); // useMemo for optimization
    const keyExtractor = useCallback((item: any, i: number) => `${i}-${item.id}`, []);
    const maxToRenderPerBatch = useMemo(() => 10, [subFilteredEvents]); // useMemo for optimization
    const windowSize = useMemo(() => 21, []); // useMemo for optimization

    if (loading) return (<View style={[todayEventsStyle.loading]}><Loader/></View>);
    if (errorMessage) return <Text>{errorMessage}</Text>;

    return (
        <View style={[todayEventsStyle.container, {width: '100%', flex: 1}]}>
            {!loading && !subFilteredEvents.length ? <NoData/> :
                <FlashList
                    {...{
                        getItemLayout,
                        initialNumToRender,
                        maxToRenderPerBatch,
                        windowSize
                    }}
                    estimatedItemSize={todayEvents.length}
                    estimatedListSize={{height, width}}
                    refreshing={loadMore}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleScroll}
                    onEndReachedThreshold={0}
                    scrollEventThrottle={16}
                    data={subFilteredEvents}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />}
            {(!isDataEmpty && loadMore) && <LottieView
                autoPlay
                style={{
                    top: -30,
                    width: 200,
                    height: 100,
                    backgroundColor: 'transparent',
                }}
                source={require('./../../../assets/lottie/load_more.json')}
            />}
            <BottomSheetFilters/>
        </View>
    );
}

const todayEventsStyle = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        display: "flex",
        marginTop: 2,
        rowGap: 5,
        alignItems: "center",
        justifyContent: 'space-between',
        width: "100%",
    },
    contentContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    scrollViewContainer: {},
    scrollViewContent: {
        flex: 1,
    },
    button: {
        backgroundColor: 'green',
        width: 90,
        height: 40,
    },
    buttonWrapper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        columnGap: 5,
    },
    loading: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
export default React.memo(TodayEvents)
