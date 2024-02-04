import React, {useRef, useEffect, ReactNode, useState} from 'react';
import { StyleSheet,Text, Animated, View } from 'react-native';

interface BackgroundImageSliderProps {
    images: string[];
    duration: number;
    children?: ReactNode;
}

const Slider: React.FC<BackgroundImageSliderProps> = ({ images, duration, children }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const currentIndex = useRef(0);
    const [index,setIndex] = useState(0)
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: false, // set to true if you want to use native driver
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: duration,
            useNativeDriver: false, // set to true if you want to use native driver
        }).start();
    };

    const changeImage = () => {
        fadeOut();
        setTimeout(() => {
            if(currentIndex.current === images.length-1){
                currentIndex.current = 0
            }else{
                currentIndex.current = currentIndex.current+1
            }
            setIndex(currentIndex.current)
            fadeIn();
        }, duration);
    };

    useEffect(() => {
        fadeIn();

        const interval = setInterval(changeImage, duration * 2);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={{ uri: images[currentIndex.current] }}
                style={[styles.image, { opacity: fadeAnim }]}
                resizeMode="cover"
            /><Text>{index}</Text>
            {children && <View style={styles.childrenContainer}>{children}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    childrenContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Slider;
