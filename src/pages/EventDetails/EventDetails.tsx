import React, {useRef} from "react";
import { Text, View, Image, StyleSheet,ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import MapView, {Marker,Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useAppSelector } from "../../hook/reduxHooks";
import CustomerInfoCard from "./CustomerInfoCard/CustomerInfoCard";
import { customMapStyleConfigs } from "../../components/Map/customMapStyle";

function MapViewDirections(props: { strokeWidth: number, apikey: string, origin: { latitude: any; longitude: any }, destination: any, strokeColor: string }) {
  return null;
}

export default function EventDetails() {
  const eventDetails = useAppSelector(state=>state.eventDetails)
  const colors = useAppSelector(state=>state.theme)
  const text_color = colors.ACCENT['1']
  const mapRef = useRef(null);

  const {imageUrls,title,description, user:{location:{lat,lng}}} = eventDetails

  const sliderSettings = {
    autoplay: true,
    showsPagination: false,
    autoplayTimeout: 3,
    loop: true
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
                  source={{ uri }}
                  onError={(err) => console.log(err.nativeEvent.error)}
                />
              </View>
            ))}
          </Swiper>
        </View>
        <CustomerInfoCard />
        <View style={[eventDetailsStyle.descrtiptionContainer]}>
          <View style={[eventDetailsStyle.content]}>
            <Text style={[eventDetailsStyle.eventTitle,{color: text_color}]}>
              {title}
            </Text>
            <Text style={[eventDetailsStyle.description,{color: text_color}]}>
              {description}
            </Text>
          </View>
        </View>
        <View style={[eventDetailsStyle.mapConatiner]}>
        <MapView
            ref={mapRef}
           initialRegion={{
            latitude: +lat,
            longitude: +lng,
            latitudeDelta: 0.006,
            longitudeDelta: 0.005,
          }}
           showsUserLocation={true}
           followsUserLocation={true}
           showsMyLocationButton={true}
           rotateEnabled={true}
           loadingEnabled={true}
           region={{
             latitude: 40.170292863987406,
             longitude: 44.56435298608088,
             latitudeDelta: 0.006,
             longitudeDelta: 0.005,
           }}
           style={[eventDetailsStyle.map]}
           provider={PROVIDER_GOOGLE}
           customMapStyle={customMapStyleConfigs}
        >
          <MapViewDirections
              origin={{ latitude:40.170292863987406, longitude: 44.56435298608088}}
              destination={{
                latitude: 40.170292863987406,
                longitude: 44.56435298608088,
                latitudeDelta: 0.006,
                longitudeDelta: 0.005,
              }}
              apikey="YOUR_GOOGLE_MAPS_API_KEY"
              strokeWidth={4}
              strokeColor="blue"
          />
        <Marker coordinate={{ latitude: +lat, longitude: +lng }}/>
        </MapView>
        </View>
      </View>
    </ScrollView>
  );
}
const eventDetailsStyle = StyleSheet.create({
  image: {
    width: "100%",
    height: 340,
  },
  mapConatiner:{
      width: '100%',
      height: 400,
      display: 'flex',
      justifyContent: 'center'
  },
  map:{
    width: '100%',
    height: 300
  },
  sliderContainer:{
    width: "100%",
    height: 340,
  },
  wrapper: {},
  slider: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  descrtiptionContainer: {
    display: "flex",
    alignItems: "center",
  },
  content: {
    width: "90%",
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgb(51, 51, 51)",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    top: 14,
  },
});
