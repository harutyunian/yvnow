import React, {useEffect} from "react";
import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import Swiper from "react-native-swiper";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import CustomerInfoCard from "./CustomerInfoCard/CustomerInfoCard";
import {customMapStyleConfigs} from "../../components/Map/customMapStyle";
import {EventService} from "../../services/EventService/EventService";
import {Badge} from "native-base";
import {setUser} from "../../store/reducer/user/user";
import {useTranslatedRoutes} from "../../hook/translatedRoutes";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "../../hook/translationHook";
import {wrapInstagramUsernameWithComponent} from "../../components/OpenIntagram/OpenInstagram";

export default function EventDetails() {
    const eventDetails = useAppSelector(state => state.eventDetails)
    const {lang} = useAppSelector(state => state.translation)
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const routes = useTranslatedRoutes()
    const navigate = useNavigation();
    const colors = useAppSelector(state => state.theme)
    const text_color = colors.ACCENT['1']
    const {id, imageUrls, title, description, filters, user: {location: {lat, lng}, address}} = eventDetails

    const sliderSettings = {
        autoplay: true,
        showsPagination: false,
        autoplayTimeout: 3,
        loop: true
    }

    useEffect(() => {
        (function () {
            try {
                const eventService = new EventService()
                eventService.addView(id)
            } catch (e) {
                console.log('something went wrong trying to add view count')
            }
        })()
    }, []);

    const handleSeePartnerProfile = () => {
        dispatch(setUser(eventDetails.user));
        navigate.navigate(routes.partnerProfile.key as never);
    }

    return (
        <ScrollView>
            <View>
                <View style={[eventDetailsStyle.sliderContainer]}>
                    <Swiper {...sliderSettings}>
                        {imageUrls.map((uri) => (
                            <View>
                                <Image
                                    key={uri}
                                    style={eventDetailsStyle.image}
                                    source={{uri}}
                                    onError={(err) => console.log(err.nativeEvent.error)}
                                />
                            </View>
                        ))}
                    </Swiper>
                </View>
                <CustomerInfoCard/>
                <View style={[eventDetailsStyle.infoWrapper]}>
                    <View style={[eventDetailsStyle.descriptionContainer]}>
                        <View style={[eventDetailsStyle.content]}>
                            <Text style={[eventDetailsStyle.eventTitle, {color: text_color}]}>
                                {title}
                            </Text>
                            <Text style={[eventDetailsStyle.description, {color: text_color}]}>
                                {wrapInstagramUsernameWithComponent(description)}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleSeePartnerProfile}>
                        <View style={[eventDetailsStyle.profile]}>
                            <Text
                                style={[eventDetailsStyle.seeProfile, {color: colors.ACCENT["1"]}]}>{t('partnerProfileButton')}</Text>
                        </View>
                    </TouchableOpacity>
                    {filters?.length && <View style={[eventDetailsStyle.badgeWrapper]}>
                        {filters.map((filter) => {
                            return <Badge
                                style={[eventDetailsStyle.badge]}
                                colorScheme={"info"}
                                variant='subtle'
                                key={filter.id}
                            >{filter[lang]}</Badge>
                        })}
                    </View>}
                    <View style={[{width: '100%', borderStyle: 'solid', borderColor: text_color, top: 25}]}>
                        <Text style={[eventDetailsStyle.description, {color: text_color, left: 18}]}>Address
                            - {address}</Text>
                    </View>
                </View>
                <View style={[eventDetailsStyle.mapConatiner]}>
                    <MapView
                        initialRegion={{
                            latitude: +lat,
                            longitude: +lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsMyLocationButton
                        showsUserLocation={true}
                        style={[eventDetailsStyle.map]}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={customMapStyleConfigs}
                    >
                        <Marker coordinate={{latitude: +lat, longitude: +lng}}/>
                    </MapView>
                </View>
            </View>
        </ScrollView>
    );
}
const eventDetailsStyle = StyleSheet.create({
    seeProfile: {
        fontWeight: '700',
        flex: 1,
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 25
    },
    image: {
        width: "100%",
        height: 340,
    },
    profile: {
        // display: "flex",
        borderRadius: 4,
        width: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 5,
        left: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(28,139,219,0.47)',
        flexDirection: 'row',
    },
    badgeWrapper: {
        display: "flex",
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 5,
        paddingHorizontal: 20
    },
    badge: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        borderRadius: 5,
    },
    mapConatiner: {
        width: '100%',
        height: 400,
        display: 'flex',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: 300
    },
    sliderContainer: {
        width: "100%",
        height: 340,
    },
    slider: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionContainer: {
        display: "flex",
        alignItems: "center",
    },
    content: {
        width: "90%",
    },
    eventTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "rgb(51, 51, 51)",
    },
    description: {
        fontSize: 14,
        fontWeight: "400",
        top: 14,
    },
});
