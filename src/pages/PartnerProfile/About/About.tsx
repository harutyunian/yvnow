import React, { useMemo, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import ImageView from "react-native-image-viewing";
import { IUser } from "../../../types/event.type";
import { HighlightsContacts } from "../../../components/HighlightsContacts/OpenInstagram";
import { useAppSelector } from "../../../hook/reduxHooks";

interface IAboutProps {
  user: IUser;
}

export function About(props: IAboutProps) {
  const {
    user: { description, profilePictures },
  } = props;
  // TODO: when profile picture is empty array [] application dcrashed
  // in this moment I will add filter from backend and I will fix this part from front end side later
  const colors = useAppSelector((state) => state.theme);
  console.log({ description, profilePictures });
  const [showModal, setShowModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const modifiedPictures = useMemo(() => {
    return !profilePictures ? [] : profilePictures.map((uri) => ({ uri }));
  }, []);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const onImagePress = (index: number) => {
    openModal();
    setImageIndex(index);
  };

  return (
    <View
      style={[aboutStyle.container, { backgroundColor: colors.ACCENT["6"] }]}
    >
      <HighlightsContacts text={description} />
      <View style={[aboutStyle.imagesContainer]}>
        {profilePictures &&
          profilePictures.length &&
          profilePictures.map((uri, index) => (
            <TouchableOpacity
              key={uri}
              style={aboutStyle.imageWrapper}
              onPress={() => onImagePress(index)}
            >
              <Image
                source={{ uri }}
                contentFit={"cover"}
                style={aboutStyle.image}
              />
            </TouchableOpacity>
          ))}
      </View>
      {profilePictures && (
        <ImageView
          backgroundColor={"image_view_background"}
          images={modifiedPictures}
          presentationStyle={"formSheet"}
          animationType={"slide"}
          imageIndex={imageIndex}
          visible={showModal}
          onRequestClose={closeModal}
        />
      )}
    </View>
  );
}

const aboutStyle = StyleSheet.create({
  container: {
    width: "100%",
    // top: 20,
    paddingLeft: 10,
    borderRadius: 10,
    paddingVertical: 10,
  },
  imagesContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  imageWrapper: {
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: "transparent",
  },
  sliderContainer: {
    width: "100%",
    height: 300,
    display: "flex",
    alignItems: "center",
  },
  modalImageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
