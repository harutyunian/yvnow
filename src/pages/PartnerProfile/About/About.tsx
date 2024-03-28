import React, {useMemo, useState} from "react";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import ImageView from "react-native-image-viewing";
import {useAppSelector} from "../../../hook/reduxHooks";
import {IUser} from "../../../types/event.type";

interface IAboutProps {
    user: IUser
}

export function About(props: IAboutProps) {
    const {user: {description, profilePictures}} = props

    const [showModal, setShowModal] = useState(false);
    const [imageIndex,setImageIndex] = useState(0)

    const modifiedPictures = useMemo(()=>{
        return profilePictures.map((uri)=>({uri}))
    },[])

    const colors = useAppSelector(state => state.theme)
    const text_color = colors.ACCENT["1"]

    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);
    const onImagePress = (index: number) => {
        openModal()
        setImageIndex(index)
    }

    return <View>
        <Text style={{color: text_color, fontSize: 16, fontWeight: '400'}}>{description}</Text>
        <View style={[aboutStyle.imagesContainer]}>
            {
                profilePictures.length && profilePictures.map((uri, index) => (
                    <TouchableOpacity
                        key={uri}
                        style={aboutStyle.imageWrapper}
                        onPress={() =>
                            onImagePress(index)}
                    >
                        <Image
                            source={{uri}}
                            resizeMode={'cover'}
                            style={aboutStyle.image}
                        />
                    </TouchableOpacity>
                ))
            }
        </View>
        {profilePictures && <ImageView
            backgroundColor={'image_view_background'}
            images={modifiedPictures}
            presentationStyle={'formSheet'}
            animationType={'slide'}
            imageIndex={imageIndex}
            visible={showModal}
            onRequestClose={closeModal}
        />}
    </View>
}

const aboutStyle = StyleSheet.create({
    imagesContainer: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: 'wrap'
    },
    imageWrapper: {
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    modalContent: {
        backgroundColor: 'transparent'
    },
    sliderContainer: {
        width: '100%',
        height: 300,
        display: 'flex',
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // width: Dimensions.get('window').width, // Set width to window width
        // height: Dimensions.get('window').height,
    },
    modalImageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})
