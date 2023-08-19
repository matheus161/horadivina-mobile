import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Animatable from "react-native-animatable";

import userService from "../../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";
import colors from "../../themes/colors";
import ButtonDetail from "../../components/ButtonDetail";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const getUser = async () => {
    setIsLoadingUserInfo(true);
    try {
      const userId = await AsyncStorage.getItem("USER_ID");
      // const token = await AsyncStorage.getItem("TOKEN");
      setUserId(userId);
      // setToken(token);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Erro ao carregar os dados, tente novamente!",
      });
    } finally {
      setIsLoadingUserInfo(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const user = await userService.getUserById(userId);
      console.log(user);
      setData(user);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Erro ao carregar os dados, tente novamente!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        {isLoading && isLoadingUserInfo ? (
          <ActivityIndicator
            size="large"
            color={colors.appPrimary}
            style={styles.activityIndicator}
          />
        ) : (
          <Text style={styles.message}>Olá, {data.name}!</Text>
        )}
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <ButtonDetail
            icon={"user-alt"}
            text1={"Alterar nome"}
            text2={"Altere as informações do usário"}
            separator
          />
          <ButtonDetail
            icon={"mail-bulk"}
            text1={"Alterar e-mail"}
            text2={"Altere o email do usuário"}
            separator
          />
          <ButtonDetail
            icon={"lock"}
            text1={"Alterar senha"}
            text2={"Altere a senha do usuário"}
            separator
          />
          <ButtonDetail
            icon={"compass"}
            text1={"Alterar dados de busca"}
            text2={"Altere o radar para suas buscas"}
            separator
          />
          <Button title="Apagar conta" />
        </ScrollView>
      </Animatable.View>
    </View>
  );
}
