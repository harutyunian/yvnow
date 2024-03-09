import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { IEventCart } from "../../../types/event.type";
import EventCart from "../../EventCard/EventCart";

interface ICustomMarkerProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  avatar: string;
}

export default function CustomMarker(props: IEventCart) {
  const { user } = props;
  const {
    location: { lat: latitude, lng: longitude },
    avatar,
  } = user;

  return (
    <Marker coordinate={{ latitude: +latitude, longitude: +longitude }}>
      <Image
        source={require("./../../../../assets/icons/marker-96.png")}
        style={[customMapStyle.markerIcon]}
      />
      <Image source={{ uri: avatar }} style={[customMapStyle.partnerLogo]} />
      <Callout>
        <EventCart {...{event: props}}/>
      </Callout>
    </Marker>
  );
}

const customMapStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer: {
    padding: 0,
  },
  partnerLogo: {
    borderRadius: 1000,
    width: 30,
    height: 30,
    left: 7,
    bottom: 40,
    backgroundColor: "yellow",
  },
  markerIcon: {
    width: 45,
    height: 45,
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
