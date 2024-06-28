import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from 'expo-image';


interface IImageSliderProps {
    imageUrls: string[]
}

const ImageSlider = (props: IImageSliderProps) => {
    const {imageUrls} = props

    return <View style={[styles.slide]}>
        <Image
            priority='high'
            style={styles.image}
            source={{uri: imageUrls[0]}}/>
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
