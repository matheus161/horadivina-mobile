import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";

import styles from "./styles";
import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation={"flipInY"}
          source={require("../../assets/Logo_Hora_Divina.png")}
          style={{ width: "100%" }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        delay={600}
        animation={"fadeInUp"}
        style={styles.containerForm}
      >
        <Text style={styles.title}>
          Localize seu local de adoração mais próximo!
        </Text>
        <Text style={styles.text}>Faça o login para começar</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
