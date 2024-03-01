import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { useTheme } from "../../../hook/themeMode";
import { LocationIcon } from "../../../components/Svg/Svg";

interface ICustomerInfoCardProps {
  title?: string;
  startDate?: string;
}

export default function CustomerInfoCard(props: ICustomerInfoCardProps) {
  const colors = useTheme();
  const { title, startDate } = props;

  return (
    <View style={[customerInfoCardStyle.container]}>
      <View
        style={[
          customerInfoCardStyle.main,
          { backgroundColor: colors.PRIMARY.MAIN },
        ]}
      >
        <View style={[customerInfoCardStyle.titleContainer]}>
          <Text style={[customerInfoCardStyle.title]}>
            Stop Club kam Jelifish
          </Text>
          <View style={[customerInfoCardStyle.dateContainer]}>
            <Text
              style={[
                customerInfoCardStyle.date,
                { color: colors.PRIMARY.MAIN },
              ]}
            >
              {dayjs().format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
        <View style={[customerInfoCardStyle.address]}>
          <LocationIcon style={[customerInfoCardStyle.locationIcon]} />
          <Text style={[customerInfoCardStyle.addressTitle]}>
            Spa center at San Jose, Californi
          </Text>
        </View>
      </View>
    </View>
  );
}

const customerInfoCardStyle = StyleSheet.create({
  main: {
    width: '90%',
    height: 90,
    borderRadius: 15,
    paddingTop: 11,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 20,
    display: 'flex',
    justifyContent: "space-between"
  },
  address: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
  },
  addressTitle: {
    fontWeight: '400',
    fontSize: 14,
    color: 'white'
  },
  locationIcon: {
    width: 12,
    height: 16,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    width: 81,
    height: 24,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  date: {
    fontWeight: "500",
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  container: {
    bottom: 30,

    width: "100%",
    alignItems: "center",
    display: "flex",
  },
});
