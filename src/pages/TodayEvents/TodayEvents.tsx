import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import LottieView from 'lottie-react-native';
import EventCart from "../../components/EventCard/EventCart";
import {EventService} from "../../services/EventService/EventService";
import {IEventCart, IFilters} from "../../types/event.type";
import {Loader} from "../../components/Loader/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    compareArrayObjects,
    isBetweenDates,
    removeDuplicatesByValues,
    shuffleArray
} from "../../helpers/helper";
import ButtonStyled from "../../components/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {TodayButtons} from "./switchButtons.enum";
import {useTranslation} from "../../hook/translationHook";
import {FilterActionsSheet} from "../../components/FiltersActionsSheet/FilterActionsSheet";
import {NoData} from "../../components/NoData/NoData";
import {setFilters} from "../../store/reducer/filter/filterReducer";
import {setLanguages} from "../../store/reducer/translation/translation";
import {langs} from "../../store/reducer/translation/types";
import {setDarkMode, setDynamicsMode, setLightMode} from "../../store/reducer/theme/themeReducer";

type TodayTabs = TodayButtons.all | TodayButtons.concert | TodayButtons.show | TodayButtons.event

export default function TodayEvents() {
    const [loadMore,setLoadMore] = useState(false)
    const [isDataEmpty,setIsDataEmpty] = useState(false)

    const [selectedFilters, setSelectedFilters] = useState<IFilters[]>([])
    const [tabFilters, setTabFilters] = useState<IEventCart[]>([]);

    const [todayEvents, setTodayEvents] = useState<IEventCart[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<IEventCart[]>([]);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [activeButton, setActiveButton] = useState(TodayButtons.all)
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
        fetchLanguage();
    }, [dispatch]);

    useEffect(() => {
        const setMode = async ():Promise<void> => {
            try {
                const mode = await AsyncStorage.getItem('theme');
                if(mode){
                    switch (mode) {
                        case "two": dispatch(setDarkMode());
                            break
                        case "tree": dispatch(setLightMode());
                            break
                        default: dispatch(setDynamicsMode());
                    }
                }else {
                    dispatch(setDynamicsMode());
                }
            } catch (error) {
                console.error('Error fetching language:', error);
            }
        };
        setMode();
    }, [dispatch]);

    useEffect(() => {
        // first to show english

        setLoading(() => true);
        getEventList(page)
        setTimeout(() => {
            setLoading(() => false);
        }, 1000)
    }, []);

    useEffect(() => {
        if (selectedFilters.length) {
            const filter = filteredEvents.filter(({filters}) => {
                //comparing filters with object id and filtering events
                return compareArrayObjects(filters, selectedFilters, "id")
            })
            setFilteredEvents(filter)
        }
    }, [selectedFilters, activeButton, tabFilters]);

    useEffect(() => {
        const filters = filteredEvents.reduce((acc, event) => {
            if (!event.filters) return acc
            return [...acc, ...event.filters]
        }, [] as IFilters[])

        // removing duplicates for staying filters which included event
        const uniqFilters = removeDuplicatesByValues<IFilters>(filters, 'id')
        dispatch(setFilters(uniqFilters))
    }, [selectedFilters, activeButton, filteredEvents]);

    async function getEventList(page: number, count: number = 50) {
        setLoadMore(()=>true)
        try {
            const eventService = new EventService();
            const result = await eventService.toDaysEvents(page, count);
            const {events} = result
            setIsDataEmpty(!events.length)
            const filters = events.reduce((acc, event) => {
                if (!event.filters) return acc
                return [...acc, ...event.filters]
            }, [] as IFilters[])
            // removing duplicates for staying filters which included event
            const uniqFilters = removeDuplicatesByValues<IFilters>(filters, 'id')
            dispatch(setFilters(uniqFilters))
            const shuffledEvents = events.reduce((acc, event) => {
                if (isBetweenDates(event.startDate, event.endDate)) acc.live.push(event)
                else acc.noLive.push(event)
                return acc
            }, {live: [], noLive: []} as { live: IEventCart[], noLive: IEventCart[] })
            const withLiveOrder = [...shuffleArray<IEventCart>(shuffledEvents.live), ...shuffleArray<IEventCart>(shuffledEvents.noLive)]
            setTodayEvents(prev => [...prev, ...withLiveOrder]);
            setFilteredEvents(prev => {
                if (activeButton === TodayButtons.all) return [...prev, ...withLiveOrder]
                return [...prev, ...withLiveOrder].filter(({type}) => type.toLowerCase() === activeButton.toLowerCase())
            })
            setTabFilters(prev => {
                if (activeButton === TodayButtons.all) return [...prev, ...withLiveOrder]
                return [...prev, ...withLiveOrder].filter(({type}) => type.toLowerCase() === activeButton.toLowerCase())
            })
            setPage(prev => prev + 1)
        } catch (e: any) {
            if (e && e.message) {
                setErrorMessage(e.message);
            }
        }finally {
            setTimeout(()=> setLoadMore(false),500)

        }
    }

    const handleChangeEventTabs = (type: TodayTabs) => {
        setActiveButton(type);
        if (type === TodayButtons.all) {
            setTabFilters(() => [...todayEvents])
            setFilteredEvents(() => [...todayEvents])
        } else {
            const eventFilteredByTabs = [...todayEvents.filter(({type: eventType}) => eventType.toLowerCase() === type.toLowerCase())]
            setTabFilters(() => eventFilteredByTabs)
            setFilteredEvents(() => eventFilteredByTabs)
        }
    }

    // @ts-ignore
    // TODO: IMPLEMENT BOTTOM SCROLL REQUEST
    const handleScroll = ({nativeEvent}: {
        nativeEvent: {
            contentOffset: { y: number };
            contentSize: { height: number };
            layoutMeasurement: { height: number }
        }
    }) => {
        const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
        const isEndReached = contentOffset.y >= contentSize.height - layoutMeasurement.height;
        if (isEndReached && !loadMore) {
            getEventList(page)
        }
    };

    const isAllActive = activeButton === TodayButtons.all;
    const isEventActive = activeButton === TodayButtons.event;
    const isShowActive = activeButton === TodayButtons.show;
    const isConcertActive = activeButton === TodayButtons.concert;
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;

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
                        backgroundColor: isEventActive ? btn_active : btn_inactive,
                        flex: 1
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
            {loading && (!todayEvents.length || !filteredEvents.length) ? <NoData/> : <ScrollView
                style={[{height: "100%"}]}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {filteredEvents.map((event, index) => (
                    <EventCart key={`${event.id}_${index}`} event={event}/>
                ))}
            </ScrollView>}
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
                {...{tabFilters, setFilteredEvents, setSelectedFilters}}
            />
        </View>
    );
}

const todayEventsStyle = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        marginTop: 10,
        marginBottom: 10,
        rowGap: 10,
        alignItems: "center",
        width: "100%",
    },
    scrollViewContainer: {
        // flex: 1,
    },
    scrollViewContent: {
        flex: 1,
        // paddingBottom: 400
    },
    button: {
        backgroundColor: 'green',
        width: 90,
        height: 40,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
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
