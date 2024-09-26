import { StyleSheet, Text, View } from "react-native";
import { Image as ExpoImage } from "expo-image";
import React, { useState } from "react";
import { Marker } from "react-native-maps";
import image from "../../../../assets/images";

export const ClusterMarker = ({ count, coordinate }: any) => {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  return (
    <Marker {...{ tracksViewChanges, coordinate }}>
      <ExpoImage
        style={style.container}
        source={image.marker_icon}
        priority="high"
        onLoadEnd={() => setTracksViewChanges(false)}
      />
      <View style={style.countWrapper}>
        <Text style={style.countText}>{count}</Text>
      </View>
    </Marker>
  );
};

const style = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    // width: 60,
    // height: 60,
    // backgroundColor: "rgba(8,90,1,0.5)",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // borderRadius: 50,
  },
  countWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: "#c43807",
    left: 5,
    bottom: 33,
  },
  countText: {
    color: "rgb(255,162,107)",
    fontSize: 18,
    fontWeight: "900",
  },
});
