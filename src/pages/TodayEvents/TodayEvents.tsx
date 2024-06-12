import React, {useEffect, useMemo, useRef, useState} from "react";
import {Text, View, StyleSheet, FlatList,Button} from "react-native";
import LottieView from 'lottie-react-native';
import _ from 'lodash'
import EventCart from "../../components/EventCard/EventCart";
import {EventService} from "../../services/EventService/EventService";
import {IEventCart, IFilters} from "../../types/event.type";
import {Loader} from "../../components/Loader/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    isBetweenDates, isDateGreaterThanEndOfDay, isIncludedToday,
    removeDuplicatesByValues,
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
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {FilterService} from "../../services/FilterService/FilterService";


export type TodayTabs = TodayButtons.all | TodayButtons.concert | TodayButtons.show | TodayButtons.event

export interface IEventsFilter {
    top: TodayTabs,
    bottom: FilterActionType,
    sub: IFilters[]
}

export default function TodayEvents() {
    const bottomSheetRef = useRef<BottomSheet>(null);


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

    // Top Buttons Filter
    const topFilteredEvents = useMemo(() => {
        return FilterService.topFilter(todayEvents,topFilter)
    }, [topFilter, todayEvents])


    //Middle Buttons Filter
    const bottomFilteredEvents = useMemo(() => {
        const {eventLists, uniqFilters} = FilterService.bottomFilteredEvents(topFilteredEvents,bottomFilter)
        dispatch(setFilters(uniqFilters))
        return eventLists
    }, [topFilteredEvents, bottomFilter])


    //Bottom part filter
    const subFilteredEvents = useMemo(() => {
        return FilterService.subFilter(bottomFilteredEvents,subFilter)
    }, [bottomFilteredEvents, subFilter]);


    async function getEventList(page: number, count: number = 50) {
        setLoadMore(() => true)
        try {
            const eventService = new EventService();
            const result = await eventService.toDaysEvents(page, count);
            const {events} = result
            setIsDataEmpty(!events.length)
            const shuffledEvents = _.groupBy(events, event =>
                isBetweenDates(event.startDate, event.endDate) ? 'live' : 'noLive'
            );
            const withLiveOrder = [
                ..._.shuffle(shuffledEvents.live),
                ..._.shuffle(shuffledEvents.noLive)
            ];
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

    const handleChangeEventTabs = (type: TodayTabs) => setTopFilter(type)

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
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
    const renderItem = ({item}: { item: IEventCart }) => <EventCart event={item}/>

    if (loading) return (<View style={[todayEventsStyle.loading]}><Loader/></View>);
    if (errorMessage) return <Text>{errorMessage}</Text>;

    return (
        <View style={[todayEventsStyle.container]}>
            <Button title='click me ' onPress={()=>{
                bottomSheetRef?.current?.expand()
            }} />
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
                <BottomSheet
                    snapPoints={["10%", "100%"]}
                    index={-1}
                    ref={bottomSheetRef}
                >
                    <BottomSheetView style={todayEventsStyle.contentContainer}>
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
                        <FilterActionsSheet
                            {...{setBottomFilter, setSubFilter}}
                        />
                    </BottomSheetView>
                </BottomSheet>
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
