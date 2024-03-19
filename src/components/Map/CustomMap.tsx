import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import CustomMarker from "./MapMarker/CustomMarker";
import { customMapStyleConfigs } from "./customMapStyle";
import { IEventCart } from "../../types/event.type";
import { EventService } from "../../services/EventService/EventService";

export default function CustomMap() {
  //Yerevan coordinates
  const coordinates = { lat: 40.1680387, lng: 44.5057575 };
  const [events, setEvents] = useState<IEventCart[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const eventService = new EventService();
        const result = await eventService.toDaysEvents();
        setEvents(result);
      } catch (e: { message: string }) {}
    })();
  }, []);

  return (
    <View style={mapStyle.container}>
      <MapView
        style={mapStyle.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={customMapStyleConfigs}
      >
        {events.map((event) => {
          return <CustomMarker key={event.id} {...event} />;
        })}
      </MapView>
    </View>
  );
}

const mapStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
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
