import React, {useEffect} from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import Swiper from "react-native-swiper";
import {Image} from 'expo-image';
import MapView,
{Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import CustomerInfoCard from "./CustomerInfoCard/CustomerInfoCard";
import {EventService} from "../../services/EventService/EventService";
import {Badge} from "native-base";
import {setUser} from "../../store/reducer/user/user";
import {useTranslatedRoutes} from "../../hook/translatedRoutes";
import {useNavigation} from "@react-navigation/native";
import {HighlightsContacts} from "../../components/HighlightsContacts/OpenInstagram";
import {LocationIcon} from "../../components/Svg/Svg";
import {DARK} from "../../store/reducer/types";
import {aubergine} from "../../components/Map/mapStyles/aubergine";
import {standard} from "../../components/Map/mapStyles/standard";
import { AntDesign } from '@expo/vector-icons';


export default function EventDetails() {
    const eventDetails = useAppSelector(state => state.eventDetails)
    const {lang} = useAppSelector(state => state.translation)
    const color = useAppSelector(state => state.theme)
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
                            <View key={uri}>
                                <Image
                                    style={eventDetailsStyle.image}
                                    source={{uri}}
                                />
                            </View>
                        ))}
                    </Swiper>
                </View>
                <CustomerInfoCard/>
                <View style={{paddingHorizontal: 20}}>
                    <View style={[eventDetailsStyle.infoWrapper, {backgroundColor: colors.ACCENT['6']}]}>
                        <View style={[eventDetailsStyle.descriptionContainer]}>
                            <View style={[eventDetailsStyle.content]}>
                                <Text style={[eventDetailsStyle.eventTitle, {color: text_color}]}>
                                    {title}
                                </Text>
                                <Text style={[eventDetailsStyle.description, {color: text_color}]}>
                                    <HighlightsContacts text={`<[+374 95 300 955]> https://www.instagram.com/stop.music.club ${description} `}/>
                                </Text>
                            </View>
                        </View>
                        <View>
                            {filters && filters?.length && <View style={[eventDetailsStyle.badgeWrapper]}>
                                {filters.map((filter) => {
                                    return <Badge
                                        colorScheme={"info"}
                                        variant='subtle'
                                        key={filter.id}
                                    >{filter[lang]}</Badge>
                                })}
                            </View>}
                            <View style={[eventDetailsStyle.addressContainer, {width: '100%', top: 25}]}>
                                <LocationIcon
                                    style={eventDetailsStyle.locationIcon}
                                    fill={color.PRIMARY.MAIN}
                                    width={20} height={20}
                                />
                                <Text style={[eventDetailsStyle.description, {
                                    color: text_color,
                                    left: 18,
                                    top: 5,
                                    fontWeight: '700'
                                }]}> Address - {address}
                                </Text>
                            </View>
                        </View>
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
                        customMapStyle={colors.mode === DARK ? aubergine : standard}
                    >
                        <Marker coordinate={{latitude: +lat, longitude: +lng}}/>
                    </MapView>
                </View>
                <TouchableOpacity onPress={handleSeePartnerProfile}
                                  style={[eventDetailsStyle.seeProfileWrapper]}>
                    <View style={[eventDetailsStyle.seeProfileButton,{backgroundColor: color.PRIMARY.MAIN}]}>
                        <Text style={eventDetailsStyle.seeButtonText}> See Venue</Text>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const eventDetailsStyle = StyleSheet.create({
    seeProfileWrapper: {
        display: 'flex',
        alignItems: 'center',
        top: -40
    },
    seeButtonText:{
        color: 'white',
        fontWeight: '500',
        fontSize: 18
    },
    seeProfileButton:{
        columnGap: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        width: '90%',
        flexDirection: 'row'
    },
    locationIcon: {
        left: 25,
        top: 5
    },
    addressContainer: {
        display: "flex",
        alignItems: 'center',
        flexDirection: 'row'
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 25,
        borderRadius: 20,
        padding: 5,
    },
    image: {
        width: "100%",
        height: 340,
    },
    profile: {
        borderRadius: 8,
        alignSelf: 'flex-start',
        left: 20,
        padding: 5,
        top: -8,
    },
    badgeWrapper: {
        flexWrap: 'wrap',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 5,
        rowGap: 5,
    },
    mapConatiner: {
        top: 40,
        width: '100%',
        height: 400,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    map: {
        width: '90%',
        height: 300,
        borderRadius: 20,
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
        paddingVertical: 20,
        borderRadius: 20,
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: "400",
    },
});
