import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Image as ExpoImage} from 'expo-image'

interface IImageSliderProps {
    imageUrls: string[]
}

const ImageSlider = (props: IImageSliderProps) => {
    const {imageUrls} = props
    const [loaded,setLoaded] = useState(false)
    const haveImage = imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0  && imageUrls[0]
    return <View style={[styles.slide]}>
        {!loaded && <ActivityIndicator/>}

        {haveImage && <ExpoImage
            onLoad={() => setLoaded(true)}
            style={styles.image}
            src={imageUrls[0]}
            source={{uri: imageUrls[0]}}
        />}
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
