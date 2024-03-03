import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, LatLng, PROVIDER_GOOGLE } from "react-native-maps";
import CustomMarker from "./MapMarker/CustomMarker";
import { customMapStyleConfigs } from "./customMapStyle";
import mockData from "./../../../mock/mockEvents.json";

export default function CustomMap() {
  const coordinates = { lat: 40.1680387, lng: 44.5057575 };

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
        {mockData.map((event) => {
          const {location:{lat,lng},avatar} = event;
          return (
            <CustomMarker
              key={lat+avatar}
              avatar={avatar}
              coordinates={{ latitude: lat, longitude: lng }}
            />
          );
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
