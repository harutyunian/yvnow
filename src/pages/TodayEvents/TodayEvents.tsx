import React, {useEffect, useState} from "react";
import {Text, View, ScrollView, StyleSheet, FlatList} from "react-native";
import EventCart from "../../components/EventCard/EventCart";
import {EventService} from "../../services/EventService/EventService";
import {IEventCart} from "../../types/event.type";
import {Spinner, HStack, Heading} from "native-base";


export default function TodayEvents() {
    const [todaysEvents, setTodaysEvents] = useState<IEventCart[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        (async function () {
            try {
                setLoading(() => true);
                const eventService = new EventService();
                const result = await eventService.toDaysEvents();
                setTodaysEvents(result);
            } catch (e: any) {
                if (e && e.message) {
                    setErrorMessage(e.message);
                }
            }
            setLoading(() => false);
        })();
    }, []);

    if (loading) {
        return (
            <View style={[todayEventsStyle.loading]}>
                <HStack>
                    <Spinner accessibilityLabel="Loading posts"/>
                    <Heading color="primary.500" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
            </View>
        );
    }

    if (errorMessage) {
        return <Text>{errorMessage}</Text>;
    }
    return (
        <View style={[todayEventsStyle.contaienr]}>
            <FlatList
                data={todaysEvents}
                renderItem={({item}) => <EventCart event={item}/>}
                keyExtractor={(item) => item.id.toString()}
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
