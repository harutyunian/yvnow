import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { useAppSelector } from "../../hook/reduxHooks";
import { IUser } from "../../types/event.type";

interface IMiniProfileProps {
  user: IUser;
}

export default function MiniProfile(props: IMiniProfileProps) {
  const { user } = props;
  const { avatar, partner, address } = user;
  const colors = useAppSelector((state) => state.theme);

  return (
    <TouchableOpacity
      style={[
        miniProfileStyles.container,
        { backgroundColor: colors.ACCENT["6"] },
      ]}
    >
      <Svg width={60} height={60}>
        <ImageSvg
          width={"100%"}
          height={"100%"}
          preserveAspectRatio="xMidYMid slice"
          href={{ uri: avatar }}
        />
      </Svg>
      <Text style={[miniProfileStyles.title, { color: colors.ACCENT["1"] }]}>
        {partner}
      </Text>
      <Text style={[miniProfileStyles.address]}>{address}</Text>
    </TouchableOpacity>
  );
}

const miniProfileStyles = StyleSheet.create({
  container: {
    width: 160 - 160 * 0.3,
    height: 190 - 190 * 0.3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  address: {
    fontSize: 12,
    fontWeight: "400",
    color: "#64748B",
  },
  avatarText: {
    position: "relative",
    height: 100,
    bottom: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});
