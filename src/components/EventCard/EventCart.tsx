import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { LocationIcon } from "../Svg/Svg";
import ImageSlider from "./Slider2";
import { IEventCart } from "../../types/event.type";
import { isBetweenDates } from "../../helpers/helper";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHooks";
import { setEventDetails } from "../../store/reducer/eventDetails/eventDetailsReducer";
import { routes } from "../../routes/routes";

interface IIEventCartProps {
  event: IEventCart;
}

export default function EventCart(props: IIEventCartProps) {
  const { event } = props;
  const { imageUrls, startDate, endDate, title, user:{address} } = event;
  const colors = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigation();

  const handlePressEvent = () => {
    navigate.navigate(routes.eventDetails as never);
    dispatch(setEventDetails(event));
  };

  return (<TouchableOpacity
        style={{ ...style.container }}
        onPress={handlePressEvent}
      >
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
                <Text style={{ ...style.address }}>{address}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
  );
}

const main = {
  width: 335,
  height: 192,
  borderRadius: 12,
};
const style = StyleSheet.create({
  container: {...main, marginBottom: 20},
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
