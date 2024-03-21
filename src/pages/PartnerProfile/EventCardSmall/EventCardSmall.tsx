import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import dayjs from "dayjs"
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../../../hook/reduxHooks";
import {CalendarIcon, ClockIcon, EyeIcon, LocationIcon} from "../../../components/Svg/Svg";
import {IEventCart} from "../../../types/event.type";
import {routes} from "../../../routes/routes";
import {setEventDetails} from "../../../store/reducer/eventDetails/eventDetailsReducer";
import {formatNumber} from "../../../helpers/helper";

interface EventCardSmall{
    event: IEventCart
}
export default function EventCardSmall(props: EventCardSmall) {
    const  {event} = props
    const  {view, imageUrls, title, startDate, endDate}= event

    const colors = useAppSelector((state) => state.theme);
    const {address} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigation()

    const handlePress = () => {
        navigate.navigate(routes.eventDetails as never);
        dispatch(setEventDetails(event));
    }
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[
                eventCardSmallStyle.container,
                {backgroundColor: colors.ACCENT["6"]},
            ]}
        >
            <Image
                style={[eventCardSmallStyle.image]}
                resizeMode="cover"
                source={{
                    uri: imageUrls[0],
                }}
            />
            <View style={[eventCardSmallStyle.infoWrapper]}>
                <Text
                    style={[eventCardSmallStyle.title, {color: colors.ACCENT["1"]}]}
                >
                    {title}
                </Text>
                <View style={[eventCardSmallStyle.dateContainer]}>
                    <View style={[eventCardSmallStyle.dateWrapper]}>
                        <CalendarIcon
                            viewBox="0 0 26 28"
                            width={13}
                            height={14}
                            fill={"#64748B"}
                        />
                        <Text style={[eventCardSmallStyle.mainText]}>{dayjs(startDate).format('D MMMM, YY')}</Text>
                    </View>
                    <View style={[eventCardSmallStyle.dateWrapper]}>
                        <ClockIcon fill={"#64748B"} width={13} height={14}/>
                        <Text
                            style={[eventCardSmallStyle.mainText]}>{dayjs(startDate).format('ha')} - {dayjs(endDate).format('ha')}</Text>
                    </View>
                </View>
                <View style={[eventCardSmallStyle.locationIcon]}>
                    <LocationIcon fill="#64748B" width={12} height={18}/>
                    <Text style={[eventCardSmallStyle.mainText]}>{address}</Text>
                </View>
                <View style={[eventCardSmallStyle.locationIcon,{right:5}]}>
                    <EyeIcon fill="#64748B" width={25} height={18}/>
                    <Text style={[eventCardSmallStyle.mainText]}>{formatNumber(view+1)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const eventCardSmallStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: 135,
        borderRadius: 15,
        paddingTop: 16,
        paddingLeft: 16,
        paddingBottom: 16,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 15
    },
    image: {
        borderRadius: 8,
        width: 100,
        height: 100,
    },
    infoWrapper: {
        paddingLeft: 17,
        display: "flex",
        height: 100,
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
    },
    mainText: {
        fontSize: 12,
        fontWeight: "400",
        color: '#64748B'
    },
    dateContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 15,
        paddingTop: 10
    },
    dateWrapper: {
        display: "flex",
        flexDirection: "row",
    },
    locationIcon: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 5,
        paddingTop: 10
    }
});
