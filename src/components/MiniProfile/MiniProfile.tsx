import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { WebView } from "react-native-webview";
import { useAppSelector } from "../../hook/reduxHooks";
import { IUser } from "../../types/event.type";

interface IMiniProfileProps {
  user: IUser;
}




export default function MiniProfile({ user }: IMiniProfileProps) {
  const { avatar, partner, address } = user;
  const colors = useAppSelector((state) => state.theme);

  const renderImage = () => {
    if (Platform.OS === "android") {
      return (
        <WebView
          style={miniProfileStyles.avatar}
          source={{ uri: avatar }}
        />
      );
    }
    return (
      <Svg width={60} height={60}>
        <ImageSvg
          width={"100%"}
          height={"100%"}
          preserveAspectRatio="xMidYMid slice"
          href={{ uri: avatar }}
        />
      </Svg>
    );
  };

  return (
    <View
      style={[
        miniProfileStyles.container,
        { backgroundColor: colors.ACCENT["6"] },
      ]}
    >
      {renderImage()}
      <Text style={[miniProfileStyles.title, { color: colors.ACCENT["1"] }]}>
        {partner}
      </Text>
      <Text style={miniProfileStyles.address}>{address}</Text>
    </View>
  );
}

const miniProfileStyles = StyleSheet.create({
  container: {
    width: 112,
    height: 133,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  address: {
    fontSize: 12,
    fontWeight: "400",
    color: "#64748B",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});
