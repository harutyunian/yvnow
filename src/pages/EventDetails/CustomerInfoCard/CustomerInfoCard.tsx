import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Image} from 'expo-image';
import dayjs from "dayjs";
import {useAppSelector} from "../../../hook/reduxHooks";
import {useTranslation} from "../../../hook/translationHook";

export default function CustomerInfoCard() {
    const colors = useAppSelector((state) => state.theme);
    const eventDetails = useAppSelector((state) => state.eventDetails);
    const {t} = useTranslation()
    const {
        startDate,
        endDate
    } = eventDetails;

    const today = dayjs(startDate).format('DD-MM-YYYY')
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
                        <Text style={[customerInfoCardStyle.iconNameText]}>{t('partner.date')}</Text>
                        <Text style={[customerInfoCardStyle.date, {color: colors.ACCENT['1']}]}>{today}</Text>
                    </View>
                </View>
                <View style={[customerInfoCardStyle.iconContainer]}>
                    <Image
                        style={[customerInfoCardStyle.iconSizes]}
                        source={require('./../../../../assets/clock.png')}
                    />
                    <View style={[customerInfoCardStyle.dateWrapper]}>
                        <Text style={[customerInfoCardStyle.iconNameText]}>{t('partner.time')}</Text>
                        <Text style={[customerInfoCardStyle.date, {color: colors.ACCENT['1']}]}>
                            {dayjs(startDate).format('HH:mm')}-
                            {dayjs(endDate).format('HH:mm')}
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
        paddingRight: 8,
        paddingBottom: 10,
        paddingLeft: 13,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    iconSizes: {
        width: 45,
        height: 45
    },
    dateWrapper: {
        top: 7,
        right: 6
    },
    date: {
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
