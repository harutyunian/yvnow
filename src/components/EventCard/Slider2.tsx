import React from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import {Image as ExpoImage} from 'expo-image';


interface IImageSliderProps {
    imageUrls: string[]
}

const ImageSlider = (props: IImageSliderProps) => {
    const {imageUrls} = props
    return <View style={[styles.slide]}>
        <ExpoImage
            priority='normal'
            style={styles.image}
            src={imageUrls[0]}
            source={{uri: imageUrls[0]}}
        />
    </View>
};

const styles = StyleSheet.create({
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
