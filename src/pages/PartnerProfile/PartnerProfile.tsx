import React, {useEffect, useState} from "react";
import {Text, Image, View, StyleSheet, ScrollView} from "react-native";
import {useAppSelector} from "../../hook/reduxHooks";
import {
    CalendarIcon,
    LocationIcon,
} from "../../components/Svg/Svg";
import ButtonStyled from "../../components/Button/Button";
import {IEventCart} from "../../types/event.type";
import EventCardSmall from "./EventCardSmall/EventCardSmall";
import {EventService} from "../../services/EventService/EventService";
import {About} from "./About/About";
import {isBetweenDates} from "../../helpers/helper";
import EventCart from "../../components/EventCard/EventCart";
import {useTranslation} from "../../hook/translationHook";

enum ProfileContent {
    event = "event",
    past = "past",
    about = "about",
}

type ProfileContentType =
    | ProfileContent.event
    | ProfileContent.past
    | ProfileContent.about;

export default function PartnerProfile() {
    const colors = useAppSelector((state) => state.theme);
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;
    const user = useAppSelector((state) => state.user);
    const {id: userId, avatar, partner, address} = user;

    const [partnerEvents, setPartnerEvents] = useState<{
        notStarted: IEventCart[];
        passed: IEventCart[];
    }>({notStarted: [], passed: []});
    const [profileTypes, setProfileTypes] = useState<ProfileContentType>(
        ProfileContent.event
    );
    const {t} = useTranslation()

    useEffect(() => {
        (async function () {
            try {
                const eventService = new EventService();
                const events = await eventService.getEventByUserId(userId);
                const withLiveOrder = events.notStarted.reduce((acc, event) => {
                    if (isBetweenDates(event.startDate, event.endDate)) acc.live.push(event)
                    else acc.noLive.push(event)
                    return acc
                }, {live: [], noLive: []} as { live: IEventCart[], noLive: IEventCart[] })
                const eventsNotStarted = [...withLiveOrder.live, ...withLiveOrder.noLive]
                setPartnerEvents({notStarted: eventsNotStarted, passed: events.passed});
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const handlePressProfileButtons = (type: ProfileContentType) => setProfileTypes(type);
    const isEventActive = profileTypes === ProfileContent.event;
    const isAboutActive = profileTypes === ProfileContent.about;
    const isPastActive = profileTypes === ProfileContent.past;

    return (
        <View style={[partnerProfileStyle.container]}>
            <View
                style={[
                    partnerProfileStyle.profile,
                    {backgroundColor: colors.ACCENT["6"]},
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
                            {color: colors.ACCENT["1"]},
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
                        <Text style={[partnerProfileStyle.addressName]}>{partnerEvents.notStarted.length} Events</Text>
                    </View>
                </View>
            </View>
            <View style={[partnerProfileStyle.buttons]}>
                <ButtonStyled
                    onPress={() => handlePressProfileButtons(ProfileContent.event)}
                    text={t('types.event')}
                    textColor={isEventActive ? "white" : colors.ACCENT["1"]}
                    style={{
                        width: 104,
                        height: 50,
                        backgroundColor: isEventActive ? btn_active : btn_inactive,
                    }}
                />
                <ButtonStyled
                    onPress={() => handlePressProfileButtons(ProfileContent.past)}
                    text={t('profile.past')}
                    textColor={isPastActive ? "white" : colors.ACCENT["1"]}
                    style={{
                        width: 104,
                        height: 50,
                        backgroundColor: isPastActive ? btn_active : btn_inactive,
                    }}
                />
                <ButtonStyled
                    onPress={() => handlePressProfileButtons(ProfileContent.about)}
                    text={t('profile.about')}
                    textColor={isAboutActive ? "white" : colors.ACCENT["1"]}
                    style={{
                        flex: 1,
                        height: 50,
                        backgroundColor: isAboutActive ? btn_active : btn_inactive,
                    }}
                />
            </View>
            <ScrollView>
                <View style={[{paddingBottom: 250, display: 'flex', alignItems: 'center'}]}>
                    {isEventActive && partnerEvents.notStarted.map((el) => {
                        if (isBetweenDates(el.startDate, el.endDate)) {
                            return <EventCart event={el} key={el.id}/>
                        }
                        return <EventCardSmall event={{...el, user}} key={el.id}/>
                    })}
                    {isPastActive && partnerEvents.passed.map((el) => (
                        <EventCardSmall event={{...el, user}} key={el.id}/>
                    ))}
                    {isAboutActive && <About user={user}/>}
                </View>
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
        paddingBottom: 10,
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
