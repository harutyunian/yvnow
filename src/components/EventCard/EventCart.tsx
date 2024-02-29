import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import { useTheme } from "../../hook/themeMode";
import { LocationIcon } from "../Svg/Svg";
import ImageSlider from "./Slider2";
import { IEventCart } from "../../types/event.type";
import { isBetweenDates } from "../../helpers/helper";


interface IIEventCartProps extends IEventCart{

}
export default function EventCart(props: IIEventCartProps) {
  const { imageUrls, startDate, endDate, title, description } = props;
  const colors = useTheme();

  return (
    <>
      <TouchableOpacity style={{ ...style.container }}>
        <ImageSlider {...{ imageUrls }} />
        <LinearGradient
          style={{ ...style.gradient }}
          colors={[
            "rgba(0, 0, 0, 0)",
            "rgba(0, 0, 0, 0)",
            "rgba(0, 0, 0, 0)",
            colors.PRIMARY.MAIN,
          ]}
        >
          <View style={{ ...style.cartInfoContainer }}>
            <View style={{ ...style.top }}>
              <View style={{ ...style.date }}>
                <Text style={{ ...style.dateText }}>
                  {dayjs(startDate).format("DD MMM YYYY")}
                </Text>
              </View>
              {isBetweenDates(startDate, endDate) && (
                <View style={{ ...style.liveNow }}>
                  <Text style={{ ...style.liveText }}>Live</Text>
                </View>
              )}
            </View>
            <View style={{ ...style.description }}>
              <Text style={{ ...style.eventTitle }}>{title}</Text>
              <View style={{ ...style.addressContainer }}>
                <LocationIcon style={{ ...style.locationIcon }} />
                <Text style={{ ...style.address }}>{description}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}

const main = {
  width: 335,
  height: 192,
  borderRadius: 12,
};
const style = StyleSheet.create({
  container: main,
  cartInfoContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  liveText: {
    fontSize: 16,
    fontWeight: "700",
    color: "red",
  },
  liveNow: {
    width: 50,
    height: 24,
    backgroundColor: "#e9b408",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  eventInfo: {
    backgroundColor: "transparent",
  },
  addressContainer: {
    display: "flex",
    height: 17,
    flexDirection: "row",
    width: 270,
  },
  eventTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  locationIcon: {
    display: "flex",
    width: 21,
  },
  address: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "400",
  },
  date: {
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    width: 81,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#FFF",
  },
  description: {},
  gradient: {
    ...main,
    position: "absolute",
    padding: 20,
  },
});
