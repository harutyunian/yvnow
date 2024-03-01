import React from "react";
import { Text, View, Image, StyleSheet,ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import CustomerInfoCard from "./CustomerInfoCard/CustomerInfoCard";

export default function EventDetails() {
  const images = [
    "https://i.ibb.co/jTJvVpd/download.jpg",
    "https://i.ibb.co/F8HG64F/logo-v1.jpg",
    "https://i.ibb.co/5hYFcwm/minion.webp",
  ];


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
            {images.map((uri) => (
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
            <Text style={[eventDetailsStyle.eventTitle]}>
              Eminem music concert in WW
            </Text>
            <Text style={[eventDetailsStyle.description]}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
              tempore assumenda repellat doloribus inventore deleniti expedita
              tempora hic eum tenetur repellendus suscipit in dicta, quaerat
              dolorum molestiae consectetur pariatur provident corporis
              distinctio minus illo. Facilis architecto asperiores nobis rerum
              eum quibusdam, dolores soluta, nisi magnam ut debitis doloribus
              fugiat delectus et voluptas voluptatem ipsum. Nam, doloremque?
              Nulla sit itaque fuga cum omnis id ratione quo qui, nihil minus
              amet ipsa tempore veniam debitis, a alias incidunt eaque nesciunt.
              Reprehenderit sit nobis magni fugit similique assumenda nulla
              dicta nisi debitis, voluptatem, accusantium fugiat est incidunt
              eligendi. Reprehenderit ea fugit at aut.
            </Text>
          </View>
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
