import React, { useMemo, useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { aubergine } from "./mapStyles/aubergine";
import { useAppSelector } from "../../hook/reduxHooks";
import { DARK } from "../../store/reducer/types";
import { standard } from "./mapStyles/standard";
import BottomSheetFilters from "../ButtomSheetFilters/ButtomSheetFilters";
import { getCluster } from "./Cluster/getCluster";
import CustomMarker from "./MapMarker/CustomMarker";
import { Loader } from "../Loader/Loader";

const lat1 = 40.15839363088361;
const lng1 = 44.401019811630256;
const lat2 = 40.18831582616864;
const lng2 = 44.52758789062501;

const latitudeDelta = Math.abs(lat2 - lat1) * 1.25; // Add some padding
const longitudeDelta = Math.abs(lng2 - lng1) * 1.2; // Add some padding

const centerLat = (lat1 + lat2) / 2;
const centerLng = (lng1 + lng2) / 2;

const initialRegion = {
  latitude: centerLat,
  longitude: centerLng,
  latitudeDelta,
  longitudeDelta,
};

export type locationType = { latitude: number; longitude: number } | null;

export default function CustomMap() {
  const [regions, setRegions] = useState(initialRegion);
  const { users } = useAppSelector((state) => state.user);
  const { eventLoading } = useAppSelector((state) => state.loader);

  const { theme: colors } = useAppSelector((state) => state);

  // es heto enq ogtagortselu jnjel chka
  // const cluster = useMemo(() => {
  //   const allCoords = events.map((c) => ({
  //     ...c,
  //     geometry: {
  //       coordinates: [c.user.location.lng, c.user.location.lat],
  //     },
  //   }));
  //   return getCluster(allCoords, regions);
  // }, [events, regions]);

  return (
    <View style={[mapStyle.container]}>
      {eventLoading && (
        <View style={[mapStyle.comingsoon]}>
          <Text style={mapStyle.commingsoonText}>
            <Loader />
          </Text>
        </View>
      )}
      <MapView
        onRegionChangeComplete={setRegions}
        showsScale={false}
        showsTraffic={false}
        showsCompass={false}
        showsIndoors={false}
        toolbarEnabled={false}
        showsIndoorLevelPicker={false}
        style={mapStyle.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        region={regions}
        mapPadding={{ top: 20, right: 20, bottom: 100, left: 20 }}
        customMapStyle={colors.mode === DARK ? aubergine : standard}
        showsUserLocation
        showsMyLocationButton
      >
        {!eventLoading &&
          users.map((user) => {
            return <CustomMarker key={user.id} {...{ user }} />;
          })}
      </MapView>
      {Platform.OS === "ios" && <BottomSheetFilters />}
    </View>
  );
}

const mapStyle = StyleSheet.create({
  comingsoon: {
    flex: 1,
    height: "100%",
    width: "100%",
    //  backgroundColor: "rgba(28,29,9,0.6)",
    position: "absolute",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  commingsoonText: {
    color: "white",
    fontSize: 25,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    zIndex: 1000,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
