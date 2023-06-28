import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";

const AnimatedAlert = ({ title, message, duration = 3000 }) => {
  useEffect(() => {
    const hideTimeout = setTimeout(() => {
      hideAnimation();
    }, duration);

    return () => {
      clearTimeout(hideTimeout);
    };
  }, []);

  const hideAnimation = () => {
    if (alertRef) {
      alertRef.slideOutUp(300).then(() => {
        // Callback após a animação de saída
      });
    }
  };

  let alertRef;

  return (
    <Animatable.View
      ref={(ref) => (alertRef = ref)}
      animation="slideInDown"
      duration={300}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <LottieView
          source={require("../assets/error.json")}
          style={styles.animation}
          autoPlay
          loop
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  animation: {
    width: 50,
    height: 50,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
  },
});

export default AnimatedAlert;
