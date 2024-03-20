import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, FlatList} from "react-native";
import EventCart from "../../components/EventCard/EventCart";
import {EventService} from "../../services/EventService/EventService";
import {IEventCart} from "../../types/event.type";
import {Loader} from "../../components/Loader/Loader";
import {isBetweenDates, shuffleArray} from "../../helpers/helper";


export default function TodayEvents() {
    const [todaysEvents, setTodaysEvents] = useState<IEventCart[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        setLoading(() => true);
        getTodayEvents(page)
        setLoading(() => false);
    }, []);

    async function getTodayEvents(page: number, count: number = 10) {
        try {
            const eventService = new EventService();
            const result = await eventService.toDaysEvents(page, count);
            const {events, total} = result
            setTotal(total)
            const shuffledEvents = events.reduce((acc, event) => {
                if (isBetweenDates(event.startDate, event.endDate)) acc.live.push(event)
                else acc.noLive.push(event)
                return acc
            }, {live: [], noLive: []} as { live: IEventCart[], noLive: IEventCart[] })
            const withLiveOrder = [...shuffleArray<IEventCart>(shuffledEvents.live), ...shuffleArray<IEventCart>(shuffledEvents.noLive)]
            setTodaysEvents(prev => [...prev, ...withLiveOrder]);
            setPage(prev => prev + 1)
        } catch (e: any) {
            if (e && e.message) {
                setErrorMessage(e.message);
            }
        }
    }

    if (loading) return (<View style={[todayEventsStyle.loading]}> <Loader/> </View>);
    if (errorMessage) return <Text>{errorMessage}</Text>;
    const fetchTodayEvents = () => {
        if(total !== todaysEvents.length){
            getTodayEvents(page)
        }
    }
    return (
        <View style={[todayEventsStyle.contaienr]}>
            <FlatList
                data={todaysEvents}
                renderItem={({item}) => <EventCart event={item}/>}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={fetchTodayEvents}
                onEndReachedThreshold={0.1}
                ListFooterComponent={<View style={[todayEventsStyle.loading]}><Loader/></View>}
            />
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
    loading: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
