import React, { useEffect, useState } from "react";
import {Image, View, ScrollView, StyleSheet } from "react-native";
import EventCart from "../../components/EventCard/EventCart";
import { EventService } from "../../services/EventService/EventService";
import { IEventCart } from "../../types/event.type";

export default function TodayEvents() {
  const [todaysEvents, setTodaysEvents] = useState<IEventCart[]>([]);
  useEffect(() => {
    (async function () {
      try {
        const eventService = new EventService();
        const result = await eventService.toDaysEvents();
        setTodaysEvents(result);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <View style={[todayEventsStyle.contaienr]}>
        {todaysEvents.map((event) => (
          <EventCart {...event} key={event.id} />
        ))}
      </View>
    </ScrollView>
  );
}

const todayEventsStyle = StyleSheet.create({
  contaienr: {
    display: "flex",
    rowGap: 10,
    alignItems: "center",
    width: "100%",
  },
});
