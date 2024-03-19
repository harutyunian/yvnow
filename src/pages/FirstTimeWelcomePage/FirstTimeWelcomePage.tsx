import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

export default function FirstTimeWelcomePage(props: any) {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('pagekey', (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          console.log("null value recieved", result);
          setModalVisible(true);
        } else {
          console.log("result", result);
        }
      }
    });
    AsyncStorage.setItem(
      props.pagekey,
      JSON.stringify({ value: "true" }),
      (err, result) => {
        console.log("error", err, "result", result);
      }
    );
  }, []);

  function setModalVisibleHandler(visible:boolean) {
    setModalVisible(visible);
  }

  return (
    <View>
      <Modal
        animationType={"slide"}
        transparent={true}
        style={styles.ftreContainer}
        visible={modalVisible}
      >
        <View style={styles.ftreContainer}>
          <View style={styles.ftreTitleContainer}>
            <Text style={styles.ftreTitle}>title</Text>
          </View>
          <View style={styles.ftreDescriptionContainer}>
            <Text style={styles.ftreDescription} allowFontScaling={true}>
              description1
            </Text>
          </View>
          <View style={styles.ftreExitContainer}>
            <TouchableHighlight
              onPress={() => {
                setModalVisibleHandler(!modalVisible);
              }}
            >
              <View style={styles.ftreExitButtonContainer}>
                <Text style={styles.ftreExitButtonText}>Exit</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  ftreContainer: {
    backgroundColor: "black",
    flex: 1,
    marginTop: 70,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "red",
  },
  ftreTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  ftreDescription: {
    color: "white",
    fontSize: 15,
    marginRight: 20,
    marginLeft: 20,
  },
  ftreCloseIcon: {
    alignSelf: "flex-end",
    flex: 0.5,
    marginRight: 10,
  },
  ftreTitleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ftreDescriptionContainer: {
    flex: 6.5,
  },
  ftreExitContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ftreExitButtonContainer: {
    width: 200,
    height: 40,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
  },
  ftreExitButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
