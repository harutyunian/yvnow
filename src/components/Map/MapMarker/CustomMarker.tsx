import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text,Platform } from "react-native";
import { WebView } from "react-native-webview";
import { Image } from "expo-image";
import { Marker, Callout } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../hook/reduxHooks";
import { IEventCart } from "../../../types/event.type";
import MiniProfile from "../../MiniProfile/MiniProfile";
import { setUser } from "../../../store/reducer/user/user";
import { isBetweenDates } from "../../../helpers/helper";
import { useTranslatedRoutes } from "../../../hook/translatedRoutes";
import image from "../../../../assets/images";

interface ICustomMarkerProps extends IEventCart {}

const CustomMarker = (props: ICustomMarkerProps) => {
  const { user, startDate, endDate } = props;
  const {
    location: { lat: latitude, lng: longitude },
    avatar,
  } = user;

  const dispatch = useAppDispatch();
  const navigate = useNavigation();
  const routes = useTranslatedRoutes();

  const [imgLoaded, setImgLoaded] = useState({
    icon: false,
    avatar: false,
  });

  useEffect(() => {
    return () => {
      setImgLoaded({
        avatar: false,
        icon: false,
      });
    };
  }, []);

  const handlePressCallout = () => {
    dispatch(setUser(user));
    navigate.navigate(routes.partnerProfile.key as never);
  };

  const renderAvatar = () => {
    if (Platform.OS === "android") {
      return (
        <WebView
          style={customMapStyle.partnerLogo}
          source={{ uri: avatar }}
          onLoad={() => setImgLoaded((prev) => ({ ...prev, avatar: true }))}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      );
    } else {
      return (
        <Image
          source={{ uri: avatar }}
          style={customMapStyle.partnerLogo}
          onLoad={() => setImgLoaded((prev) => ({ ...prev, avatar: true }))}
        />
      );
    }
  };

  return (
    <Marker
      coordinate={{ latitude: +latitude, longitude: +longitude }}
      tracksViewChanges={!imgLoaded.avatar && !imgLoaded.icon}
    >
      {isBetweenDates(startDate, endDate) && (
        <View style={customMapStyle.liveContainer}>
          <Text style={customMapStyle.liveText}>Live</Text>
        </View>
      )}
      <Image
        source={image.marker_icon}
        style={customMapStyle.markerIcon}
        onLoad={() => setImgLoaded((prev) => ({ ...prev, icon: true }))} 
      />
      <View style={customMapStyle.avatarContainer}>
        <Image
          priority={'high'}
          source={{ uri: avatar }}
          style={customMapStyle.partnerLogo}
          onLoad={() => setImgLoaded((prev) => ({ ...prev, avatar: true }))}
        />
      </View>
      <Callout
        tooltip
        style={customMapStyle.calloutContainer}
        preserveAspectRatio="xMidYMid slice"
        onPress={handlePressCallout}
      >
        <MiniProfile user={user} />
      </Callout>
    </Marker>
  );
};

const customMapStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  liveContainer: {
    width: 30,
    height: 15,
    left: 6.5,
    backgroundColor: "#e9b408",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  liveText: {
    fontSize: 8,
    fontWeight: "700",
    color: "red",
  },
  lottieIcon: {
    width: 45,
    height: 45,
  },
  lottieAvatar: {
    borderRadius: 1000,
    width: 22,
    height: 22,
    left: 11,
    bottom: 40,
  },
  iconContainer: {
    padding: 0,
  },
  avatarContainer: {
    overflow: "hidden",
    width: 26,
    height: 26,
    left: 5,
    bottom: 33,
  },
  partnerLogo: {
    width: "100%",
    height: "100%",
  },
  markerIcon: {
    width: 36,
    height: 36,
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

export default CustomMarker;
