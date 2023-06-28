import React, { useState } from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

import colors from "../themes/colors";

const AlertView = ({ title, message, buttonColor, jsonPath }) => {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={alertVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modaView}>
            <Text style={styles.modalText}>{title}</Text>
            <View
              style={{
                width: "100%",
                height: 0.5,
                backgroundColor: colors.grey,
                marginVertical: 15,
              }}
            >
              <View
                style={{
                  width: "50%",
                  height: 100,
                }}
              >
                <LottieView
                  source={require("../assets/error.json")}
                ></LottieView>
              </View>
            </View>
            <Text style={styles.textStyle}>{message}</Text>
          </View>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: buttonColor }}
            onPress={() => {
              setAlertVisible(!alertVisible);
            }}
          >
            <Text style={styles.okStyle}> Ok</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  modaView: {
    width: "80%",
    margin: 10,
    backgroundColor: colors.appPrimary,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  openButton: {
    backgroundColor: colors.grey,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "100%",
    marginTop: 40,
  },
  textStyle: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
  okStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 34,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AlertView;
