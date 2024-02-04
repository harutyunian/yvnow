import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSlider: React.FC = () => {
    const images = [
        'https://st2.depositphotos.com/1112607/6059/i/450/depositphotos_60597655-stock-photo-funny-girls.jpg',
        'https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg',
        'https://images.unsplash.com/photo-1591243315780-978fd00ff9db?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ja3RhaWwlMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D'
    ];
    return (
        <Swiper style={styles.wrapper} autoplay>
            {images.map((image, index) => (
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
