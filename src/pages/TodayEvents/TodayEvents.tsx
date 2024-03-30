import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import EventCart from "../../components/EventCard/EventCart";
import {EventService} from "../../services/EventService/EventService";
import {IEventCart} from "../../types/event.type";
import {Loader} from "../../components/Loader/Loader";
import {isBetweenDates, shuffleArray} from "../../helpers/helper";
import ButtonStyled from "../../components/Button/Button";
import {useAppSelector} from "../../hook/reduxHooks";
import {TodayButtons} from "./switchButtons.enum";
import {useTranslation} from "../../hook/translationHook";

type TodayTabs = TodayButtons.all | TodayButtons.concert | TodayButtons.show | TodayButtons.event

export default function TodayEvents() {
    const [todaysEvents, setTodaysEvents] = useState<IEventCart[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<IEventCart[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [activeButton, setActiveButton] = useState(TodayButtons.all)
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()

    useEffect(() => {
        setLoading(() => true);
        getTodayEvents(page)
        setLoading(() => false);
    }, []);

    async function getTodayEvents(page: number, count: number = 10) {
        try {
            const eventService = new EventService();
            const result = await eventService.toDaysEvents(page, count);
            const {events} = result
            const shuffledEvents = events.reduce((acc, event) => {
                if (isBetweenDates(event.startDate, event.endDate)) acc.live.push(event)
                else acc.noLive.push(event)
                return acc
            }, {live: [], noLive: []} as { live: IEventCart[], noLive: IEventCart[] })
            const withLiveOrder = [...shuffleArray<IEventCart>(shuffledEvents.live), ...shuffleArray<IEventCart>(shuffledEvents.noLive)]
            setTodaysEvents(prev => [...prev, ...withLiveOrder]);

            setFilteredEvents(prev => {
                if (activeButton === TodayButtons.all) return [...prev, ...withLiveOrder]
                return [...prev, ...withLiveOrder].filter(({type}) => type.toLowerCase() === activeButton.toLowerCase())
            })
            setPage(prev => prev + 1)
        } catch (e: any) {
            if (e && e.message) {
                setErrorMessage(e.message);
            }
        }
    }

    const handleChangeEventTabs = (type: TodayTabs) => {
        setActiveButton(type);
        if (type === TodayButtons.all) setFilteredEvents(() => [...todaysEvents])
        else setFilteredEvents(() => [...todaysEvents.filter(({type: eventType}) => eventType.toLowerCase() === type.toLowerCase())])
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
        // const {contentOffset, contentSize, layoutMeasurement} = nativeEvent;
        // const isEndReached = contentOffset.y >= contentSize.height - layoutMeasurement.height;
        // if (isEndReached) {
        //     getTodayEvents(page)
        // }
    };

    const isAllActive = activeButton === TodayButtons.all;
    const isEventActive = activeButton === TodayButtons.event;
    const isShowActive = activeButton === TodayButtons.show;
    const isConcertActive = activeButton === TodayButtons.concert;
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;

    if (loading) return (<View style={[todayEventsStyle.loading]}> <Loader/> </View>);
    if (errorMessage) return <Text>{errorMessage}</Text>;

    return (
        <View style={[todayEventsStyle.contaienr]}>
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
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {filteredEvents.map((event, index) => (
                    <EventCart key={`${event.id}_${index}`} event={event}/>
                ))}
            </ScrollView>
        </View>
    );
}

const todayEventsStyle = StyleSheet.create({
    contaienr: {
        display: "flex",
        marginTop: 10,
        marginBottom: 10,
        rowGap: 10,
        alignItems: "center",
        width: "100%",
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
