import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';


interface IImageSliderProps {
    imageUrls: string[]
}
const ImageSlider = (props:IImageSliderProps) => {
    const {imageUrls} = props
    return (
        <Swiper style={styles.wrapper} autoplay>
            {imageUrls.length && imageUrls.map((image, index) => (
                <View key={index} style={styles.slide}>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
            ))}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 12,
        width: '100%',
        height: '100%',
    },
});
export default ImageSlider;
