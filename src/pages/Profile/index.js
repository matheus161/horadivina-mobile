import React from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import styles from "./styles";
import colors from "../../themes/colors";

export default function Main() {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Olá</Text>
      </Animatable.View>

      <Animatable.View
        animation={"fadeInUp"}
        style={styles.containerForm}
      ></Animatable.View>
    </View>
  );
}
