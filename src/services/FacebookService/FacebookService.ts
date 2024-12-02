import { initializeAsync, logEventAsync } from "expo-facebook";

import { Alert } from "react-native";
import { YVNOW_PIXEL_ANDROID } from "../../constants/fb";

export const initFacebook = async () => {
  try {
    await initializeAsync(YVNOW_PIXEL_ANDROID);
    Alert.alert("success", "***test***");
  } catch (error) {
    console.error("Failed to initialize Facebook SDK", error);
    Alert.alert("error", "***test***");
  }
};

export const sendCustomEvent = async () => {
  try {
    await logEventAsync("test_event", {
      valueToTrack: 100, // optional: custom parameter to track
    });
    console.log("Custom event logged");
  } catch (error) {
    console.error("Error logging event", error);
  }
};
