import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Text, View, StyleSheet, FlatList, Dimensions} from "react-native";
import LottieView from 'lottie-react-native';
import _ from 'lodash'
import EventCart from "../../components/EventCard/EventCart";
import {EventService} from "../../services/EventService/EventService";
import {IEventCart, IFilters} from "../../types/event.type";
import {Loader} from "../../components/Loader/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isBetweenDates, removeDuplicatesByValues} from "../../helpers/helper";
import {useAppDispatch,} from "../../hook/reduxHooks";
import {TodayButtons} from "./switchButtons.enum";
import {
    FilterAction,
    FilterActionType
} from "../../components/FiltersActionsSheet/FilterActionsSheet";
import {NoData} from "../../components/NoData/NoData";
import {setFilters} from "../../store/reducer/filter/filterReducer";
import {setLanguages} from "../../store/reducer/translation/translation";
import {langs} from "../../store/reducer/translation/types";
import {setDarkMode, setLightMode} from "../../store/reducer/theme/themeReducer";
import {FilterService} from "../../services/FilterService/FilterService";
import {TodayTabs} from "../../types/filter.type";
import BottomSheetFilters from "../../components/ButtomSheetFilters/ButtomSheetFilters";

function TodayEvents() {
    const [loadMore, setLoadMore] = useState(false)
    const [isDataEmpty, setIsDataEmpty] = useState(false)

    const [todayEvents, setTodayEvents] = useState<IEventCart[]>([]); //This list we are getting from server

    const [topFilter, setTopFilter] = useState<TodayTabs>(TodayButtons.all) // Top part filters state
    const [bottomFilter, setBottomFilter] = useState<FilterActionType>(FilterAction.all) // Bottom part filter state
    const [subFilter, setSubFilter] = useState<IFilters[]>([]) // Sub filters


    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                type langType = langs.EN | langs.RU | langs.AM
                const storedLang = await AsyncStorage.getItem('lang');
                const lang: langType | undefined = storedLang ? (storedLang as langType) : langs.EN;
                dispatch(setLanguages(lang));
            } catch (error) {
                console.error('Error fetching language:', error);
            }
        };
        const setMode = async (): Promise<void> => {
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
    const topFilteredEvents = useMemo(() => {
        return FilterService.topFilter(todayEvents, topFilter)
    }, [topFilter, todayEvents])


    //Middle Buttons Filter
    const bottomFilteredEvents = useMemo(() => {
        const {eventLists} = FilterService.bottomFilteredEvents(topFilteredEvents, bottomFilter)
        return eventLists
    }, [topFilteredEvents, bottomFilter])


    //Bottom part filter
    const subFilteredEvents = useMemo(() => {
        return FilterService.subFilter(bottomFilteredEvents, subFilter)
    }, [bottomFilteredEvents, subFilter]);


    async function getEventList(page: number, count: number = 5) {
        setLoadMore(true);
        try {
            const eventService = new EventService();
            const result = await eventService.toDaysEvents(page, count);
            const {events} = result
            const shuffledEvents = _.groupBy(events, event =>
                isBetweenDates(event.startDate, event.endDate) ? 'live' : 'noLive'
            );
            const withLiveOrder = [
                ..._.shuffle(shuffledEvents.live),
                ..._.shuffle(shuffledEvents.noLive)
            ];
            const eventsList = [...todayEvents, ...withLiveOrder].map((el) => el.filters).flat()
            const uniqFilters = removeDuplicatesByValues<IFilters>(eventsList, 'id')
            setTodayEvents(prev => [...prev, ...events]);
            setIsDataEmpty(!events.length)
            dispatch(setFilters(uniqFilters))
            setPage(prev => prev + 1)
        } catch (e: any) {
            if (e && e.message) {
                setErrorMessage(e.message);
            }
        } finally {
            setTimeout(() => {
                setLoadMore(false);
                setLoading(() => false);
            }, 2000)
        }
    }


    const handleScroll = useCallback(() => {
        !isDataEmpty && getEventList(page)
    }, [loadMore, isDataEmpty, page])

    // memoed values for FlatList
    const renderItem = useCallback(({item}: { item: IEventCart }) => {
        return <EventCart event={item}/>
    }, [])
    const getItemLayout = useCallback((_: any, index: number) => {
        const screenWidth = Dimensions.get('window').width;
        const height = screenWidth / 2
        return {length: height, offset: height * index, index}
    }, [])

    const initialNumToRender = useMemo(() => 10, []); // useMemo for optimization
    const keyExtractor = useCallback((item: IEventCart) => {
        return `${item.id}_key`
    }, []);
    const maxToRenderPerBatch = useMemo(() => 10, [subFilteredEvents]); // useMemo for optimization
    const windowSize = useMemo(() => 21, []); // useMemo for optimization

    if (loading) return (<View style={[todayEventsStyle.loading]}><Loader/></View>);
    if (errorMessage) return <Text>{errorMessage}</Text>;

    return (
        <View style={[todayEventsStyle.container]}>
            {!loading && !subFilteredEvents.length ? <NoData/> :
                <FlatList
                    {...{
                        getItemLayout,
                        initialNumToRender,
                        maxToRenderPerBatch,
                        windowSize
                    }}
                    refreshing={loadMore}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleScroll}
                    onEndReachedThreshold={0}
                    scrollEventThrottle={16}
                    data={subFilteredEvents}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />
            }
            {(!isDataEmpty && loadMore) && <LottieView
                autoPlay
                style={{
                    top: 30,
                    width: 200,
                    height: 100,
                    backgroundColor: 'transparent',
                }}
                source={require('./../../../assets/lottie/load_more.json')}
            />}
            <BottomSheetFilters {...{
                subFilter,
                topFilter,
                setTopFilter,
                setBottomFilter,
                setSubFilter
            }}/>
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
