import React from "react";
import { StyleSheet, Image } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../hook/reduxHooks";
import { IEventCart } from "../../../types/event.type";
import MiniProfile from "../../MiniProfile/MiniProfile";
import { setUser } from "../../../store/reducer/user/user";

export default function CustomMarker(props: IEventCart) {
  const { user } = props;
  const {
    location: { lat: latitude, lng: longitude },
    avatar,
  } = user;
  const dispatch = useAppDispatch();
  const navigate = useNavigation();

  const handlePressCallout = () => {
    dispatch(setUser(user));
    navigate.navigate("Partner Profile" as never);
  };

  return (
    <Marker coordinate={{ latitude: +latitude, longitude: +longitude }}>
      <Image
        source={require("./../../../../assets/icons/marker-96.png")}
        style={[customMapStyle.markerIcon]}
      />
      <Image source={{ uri: avatar }} style={[customMapStyle.partnerLogo]} />
      <Callout
        tooltip
        style={[customMapStyle.calloutContainer]}
        onPress={() => handlePressCallout()}
      >
        <MiniProfile {...{ user }} />
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
    borderRadius: 5,
  },
  calloutText: {
    fontWeight: "bold",
  },
});
