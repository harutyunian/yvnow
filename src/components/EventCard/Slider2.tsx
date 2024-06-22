import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from 'expo-image';


interface IImageSliderProps {
    imageUrls: string[]
}

const ImageSlider = (props: IImageSliderProps) => {
    const {imageUrls} = props
    if (imageUrls.length === 1) {
        return <View style={[styles.slide, styles.wrapper]}>
            <Image
                transition={20}
                priority='high'
                style={styles.image}
                source={{uri: imageUrls[0]}}/>
        </View>
    }
    return (
        <View style={styles.wrapper}>
            {imageUrls.length && imageUrls.map((image, index) => (
                <View key={index} style={[styles.slide]}>
                    <Image
                        transition={20}
                        priority='high'
                        style={styles.image}
                        source={{uri: image}}/>
                </View>
            ))}
        </View>
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
