import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

import userService from "../../services/userService";

import Slider from "@react-native-community/slider";

import styles from "./styles";
import colors from "../../themes/colors";

export default function ChangeRatio() {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [token, setToken] = useState("");
  const [ratio, setRatio] = useState(user.ratio);

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      await userService.updateRatio(ratio, token);
      Toast.show({
        type: "success",
        text1: "Distância máxima atualizada com sucesso!",
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Algo deu errado, tente novamente!",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      setToken(token);
    } catch (error) {
      navigation.goBack();
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Algo deu errado, tente novamente!",
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={25} color={colors.fontPrimary} />
        </TouchableOpacity>
        <Text style={styles.message}>Olá, {user.name}!</Text>
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <View style={styles.ratioContainer}>
          <Text style={styles.ratioText}>Distância Máxima</Text>
          <Text style={styles.ratioText}>{ratio} km</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor={colors.appPrimary}
          maximumTrackTintColor="#A9A9A9"
          // thumbTintColor={colors.appPrimary}
          onValueChange={(value) => setRatio(value.toFixed(0))}
          value={ratio}
          tapToSeek
        />
        <View style={styles.separator} />
        <View style={{ margin: 10 }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animatable.View>
    </View>
  );
}
