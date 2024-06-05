import React, {useEffect, useMemo, useState} from "react";
import {Text, View, StyleSheet, FlatList} from "react-native";
import LottieView from 'lottie-react-native';
import EventCart from "../../components/EventCard/EventCart";
import {EventService} from "../../services/EventService/EventService";
import {IEventCart, IFilters} from "../../types/event.type";
import {Loader} from "../../components/Loader/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    compareArrayObjects,
    isBetweenDates, isDateGreaterThanEndOfDay, isIncludedToday,
    removeDuplicatesByValues,
    shuffleArray
} from "../../helpers/helper";
import ButtonStyled from "../../components/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {TodayButtons} from "./switchButtons.enum";
import {useTranslation} from "../../hook/translationHook";
import {
    FilterAction,
    FilterActionsSheet,
    FilterActionType
} from "../../components/FiltersActionsSheet/FilterActionsSheet";
import {NoData} from "../../components/NoData/NoData";
import {setFilters} from "../../store/reducer/filter/filterReducer";
import {setLanguages} from "../../store/reducer/translation/translation";
import {langs} from "../../store/reducer/translation/types";
import {setDarkMode, setDynamicsMode, setLightMode} from "../../store/reducer/theme/themeReducer";

export type TodayTabs = TodayButtons.all | TodayButtons.concert | TodayButtons.show | TodayButtons.event

export interface IEventsFilter {
    top: TodayTabs,
    bottom: FilterActionType,
    sub: IFilters[]
}

export default function TodayEvents() {
    const [loadMore, setLoadMore] = useState(false)
    const [isDataEmpty, setIsDataEmpty] = useState(false)

    const [todayEvents, setTodayEvents] = useState<IEventCart[]>([]); //This list we are getting from server

    const [topFilter, setTopFilter] = useState<TodayTabs>(TodayButtons.all) // Top part filters state
    const [bottomFilter, setBottomFilter] = useState<FilterActionType>(FilterAction.all) // Bottom part filter state
    const [subFilter, setSubFilter] = useState<IFilters[]>([]) // Sub filters


    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const colors = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const {t} = useTranslation()


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
                        case "two":
                            dispatch(setDarkMode());
                            break
                        case "tree":
                            dispatch(setLightMode());
                            break
                        default:
                            dispatch(setDynamicsMode());
                    }
                } else {
                    dispatch(setDynamicsMode());
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

    const topFilteredEvents = useMemo(() => {
        if (topFilter === TodayButtons.all) {
            return todayEvents
        }
        return todayEvents.filter(({type}) => type.toLowerCase() === topFilter.toLowerCase())
    }, [topFilter, todayEvents])

    const bottomFilteredEvents = useMemo(() => {
        let eventLists = topFilteredEvents
        if (bottomFilter === FilterAction.live) {
            eventLists = topFilteredEvents.filter((event) => {
                const {startDate, endDate} = event
                return isBetweenDates(startDate, endDate)
            })
        } else if (bottomFilter === FilterAction.upcoming) {
            eventLists = topFilteredEvents.filter((event) => {
                const {startDate} = event
                return isDateGreaterThanEndOfDay(startDate)
            })
        } else if (bottomFilter === FilterAction.today) {
            eventLists = topFilteredEvents.filter((event) => {
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
        if (subFilter.length) {
            return bottomFilteredEvents.filter(({filters}) => {
                return compareArrayObjects(filters, subFilter, "id")
            })
        }
        return bottomFilteredEvents
    }, [bottomFilteredEvents, subFilter])


    async function getEventList(page: number, count: number = 50) {
        setLoadMore(() => true)
        try {
            const eventService = new EventService();
            const result = await eventService.toDaysEvents(page, count);
            const {events} = result
            setIsDataEmpty(!events.length)
            const shuffledEvents = events.reduce((acc, event) => {
                if (isBetweenDates(event.startDate, event.endDate)) acc.live.push(event)
                else acc.noLive.push(event)
                return acc
            }, {live: [], noLive: []} as { live: IEventCart[], noLive: IEventCart[] })
            const withLiveOrder = [...shuffleArray<IEventCart>(shuffledEvents.live), ...shuffleArray<IEventCart>(shuffledEvents.noLive)]
            setTodayEvents(prev => [...prev, ...withLiveOrder]);
            setPage(prev => prev + 1)
        } catch (e: any) {
            if (e && e.message) {
                setErrorMessage(e.message);
            }
        } finally {
            setTimeout(() => setLoadMore(false), 500)
            setLoading(() => false);
        }
    }

    const handleChangeEventTabs = (type: TodayTabs) => {
        setTopFilter(type)
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const handleScroll = ({nativeEvent}: any) => {
        if (isCloseToBottom(nativeEvent)) {
            if (!loadMore) {
                !isDataEmpty && getEventList(page)
            }
        }
    }
    const isAllActive = topFilter === TodayButtons.all;
    const isEventActive = topFilter === TodayButtons.event;
    const isShowActive = topFilter === TodayButtons.show;
    const isConcertActive = topFilter === TodayButtons.concert;
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;
    const renderItem = ({item}: { item: IEventCart }) => (
        <EventCart event={item}/>
    );
    if (loading) return (<View style={[todayEventsStyle.loading]}><Loader/></View>);
    if (errorMessage) return <Text>{errorMessage}</Text>;

    return (
        <View style={[todayEventsStyle.container]}>
            <View style={[todayEventsStyle.buttonWrapper]}>
                <ButtonStyled
                    text={t('types.all')}
                    onPress={() => handleChangeEventTabs(TodayButtons.all)}
                    textColor={isAllActive ? "white" : colors.ACCENT["1"]}
                    style={[todayEventsStyle.button, {
                        backgroundColor: isAllActive ? btn_active : btn_inactive,
                    }]}
                />
                <ButtonStyled
                    text={t('types.event')}
                    textColor={isEventActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.event)}
                    style={[todayEventsStyle.button, {
                        backgroundColor: isEventActive ? btn_active : btn_inactive
                    }]}
                />
                <ButtonStyled
                    text={t('types.show')}
                    textColor={isShowActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.show)}
                    style={[todayEventsStyle.button, {
                        backgroundColor: isShowActive ? btn_active : btn_inactive,
                    }]}
                />
                <ButtonStyled
                    text={t('types.concert')}
                    textColor={isConcertActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.concert)}
                    style={[todayEventsStyle.button, {
                        backgroundColor: isConcertActive ? btn_active : btn_inactive,
                    }]}
                />
            </View>
            {!loading && !subFilteredEvents.length ? <NoData/> :
                <FlatList
                    style={[{height: "100%"}]}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    data={subFilteredEvents}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                />
            }
            {(!isDataEmpty && loadMore) && <LottieView
                autoPlay
                style={{
                    width: 200,
                    height: 100,
                    backgroundColor: 'transparent',
                }}
                source={require('./../../../assets/lottie/load_more.json')}
            />}
            <FilterActionsSheet
                {...{setBottomFilter, setSubFilter}}
            />
        </View>
    );
}

const todayEventsStyle = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        marginTop: 2,
        rowGap: 5,
        alignItems: "center",
        justifyContent: 'space-between',
        width: "100%",
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
