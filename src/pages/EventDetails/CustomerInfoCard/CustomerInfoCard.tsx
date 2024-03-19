import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import dayjs from "dayjs";
import {useAppSelector} from "../../../hook/reduxHooks";

export default function CustomerInfoCard() {
    const colors = useAppSelector((state) => state.theme);
    const eventDetails = useAppSelector((state) => state.eventDetails);
    const {
        startDate,
        endDate
    } = eventDetails;

    return (
        <View style={[customerInfoCardStyle.container]}>
            <View
                style={[
                    customerInfoCardStyle.main,
                    {backgroundColor: colors.ACCENT['6']},
                ]}
            >
                <View style={[customerInfoCardStyle.iconContainer]}>
                    <Image
                        style={[customerInfoCardStyle.iconSizes]}
                        source={require('../../../../assets/calendar.png')}
                    />
                    <View style={[customerInfoCardStyle.dateWrapper]}>
                        <Text style={[customerInfoCardStyle.iconNameText]}>Date</Text>
                        <Text style={[customerInfoCardStyle.date,{color: colors.ACCENT['1']}]}>{dayjs(startDate).format('DD-MM-YYYY')}</Text>
                    </View>
                </View>
                <View style={[customerInfoCardStyle.iconContainer]}>
                    <Image
                        style={[customerInfoCardStyle.iconSizes]}
                        source={require('./../../../../assets/clock.png')}
                    />
                    <View style={[customerInfoCardStyle.dateWrapper]}>
                        <Text style={[customerInfoCardStyle.iconNameText]}>Time</Text>
                        <Text style={[customerInfoCardStyle.date,{color: colors.ACCENT['1']}]}>
                            {dayjs(startDate).format('hh:ss')}-
                            {dayjs(endDate).format('hh:ss')}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const customerInfoCardStyle = StyleSheet.create({
    main: {
        width: "80%",
        height: 80,
        borderRadius: 15,
        paddingTop: 11,
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 20,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    iconSizes: {
        width: 45,
        height: 45
    },
    dateWrapper:{

    },
    date:{
        fontWeight: '500',
        fontSize: 12
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 12
    },
    iconNameText: {
        color: '#64748B',
        fontSize: 12,
        fontWeight: '400'
    },
    container: {
        bottom: 30,
        width: "100%",
        alignItems: "center",
        display: "flex",
    },
});
