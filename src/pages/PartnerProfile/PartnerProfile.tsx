import React, { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../hook/reduxHooks";
import {
  CalendarIcon,
  LocationIcon,
} from "../../components/Svg/Svg";
import ButtonStyled from "../../components/Button/Button";
import { IEventCart } from "../../types/event.type";
import EventCardSmall from "./EventCardSmall/EventCardSmall";
import { EventService } from "../../services/EventService/EventService";

enum ProfileContens {
  event = "event",
  past = "past",
  about = "about",
}
type ProfileContensType =
  | ProfileContens.event
  | ProfileContens.past
  | ProfileContens.about;

export default function PartnerProfile() {
  const colors = useAppSelector((state) => state.theme);
  const btn_inactive = colors.ACCENT["6"];
  const btn_active = colors.PRIMARY.MAIN;
  const user = useAppSelector((state) => state.user);
  const { id: userId, avatar, partner, address } = user;

  const [partnerEvents, setPartnerEvents] = useState<{
    notStarted: IEventCart[];
    passed: IEventCart[];
  }>({ notStarted: [], passed: [] });
  const [profileTypes, setProfileTypes] = useState<ProfileContensType>(
    ProfileContens.event
  );

  useEffect(() => {
    (async function () {
      try {
        const eventService = new EventService();
        const events = await eventService.getEventByUserId(userId);
        setPartnerEvents(events);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handlePressProfileButtons = (type: ProfileContensType) =>
    setProfileTypes(type);

  const isEventActive = profileTypes === ProfileContens.event;
  const isAboutActive = profileTypes === ProfileContens.about;
  const isPastActive = profileTypes === ProfileContens.past;
  return (
    <View style={[partnerProfileStyle.container]}>
      <View
        style={[
          partnerProfileStyle.profile,
          { backgroundColor: colors.ACCENT["6"] },
        ]}
      >
        <Image
          style={[partnerProfileStyle.avatar]}
          resizeMode="cover"
          source={{
            uri: avatar,
          }}
        />
        <View style={[partnerProfileStyle.partnerInfo]}>
          <Text
            style={[
              partnerProfileStyle.partnerName,
              { color: colors.ACCENT["1"] },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {partner}
          </Text>
          <View style={[partnerProfileStyle.addressWrapper]}>
            <LocationIcon
              style={[partnerProfileStyle.locationIcon]}
              fill={"#64748B"}
            />
            <Text style={[partnerProfileStyle.addressName]}>{address}</Text>
          </View>
          <View style={[partnerProfileStyle.addressWrapper]}>
            <CalendarIcon
              viewBox="0 0 26 28"
              width={13}
              height={14}
              fill={"#64748B"}
            />
            <Text style={[partnerProfileStyle.addressName]}>30, Events</Text>
          </View>
        </View>
      </View>
      <View style={[partnerProfileStyle.buttons]}>
        <ButtonStyled
          onPress={() => handlePressProfileButtons(ProfileContens.event)}
          text="Events"
          textColor={isEventActive ? "white" : colors.ACCENT["1"]}
          style={{
            width: 104,
            height: 50,
            backgroundColor: isEventActive ? btn_active : btn_inactive,
          }}
        />
        <ButtonStyled
          onPress={() => handlePressProfileButtons(ProfileContens.past)}
          text="Past"
          textColor={isPastActive ? "white" : colors.ACCENT["1"]}
          style={{
            width: 104,
            height: 50,
            backgroundColor: isPastActive ? btn_active : btn_inactive,
          }}
        />
        <ButtonStyled
          onPress={() => handlePressProfileButtons(ProfileContens.about)}
          text="About"
          textColor={isAboutActive ? "white" : colors.ACCENT["1"]}
          style={{
            width: 104,
            height: 50,
            backgroundColor: isAboutActive ? btn_active : btn_inactive,
          }}
        />
      </View>
      <ScrollView contentContainerStyle={[{ paddingBottom: 90 }]}>
        {isPastActive &&  partnerEvents.passed.map((el) => (
          <EventCardSmall {...el} key={el.id} />
        ))}
         {isEventActive &&  partnerEvents.notStarted.map((el) => (
          <EventCardSmall {...el} key={el.id} />
        ))}

      </ScrollView>
    </View>
  );
}

const partnerProfileStyle = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttons: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  profile: {
    padding: 16,
    width: "100%",
    height: 132,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
  },
  partnerInfo: {
    paddingLeft: 17,
    rowGap: 12,
  },
  locationIcon: {
    width: 15,
    height: 17,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: "700",
  },
  addressName: {
    fontSize: 12,
    fontWeight: "400",
    color: "#64748B",
  },
  addressWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
