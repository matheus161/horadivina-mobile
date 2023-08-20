import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/native";

import userService from "../../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import colors from "../../themes/colors";
import ButtonDetail from "../../components/ButtonDetail";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [token, setToken] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem("USER_ID");
      const user = await userService.getUserById(userId);
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

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("USER_ID");
      await AsyncStorage.removeItem("TOKEN");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Erro ao sair da conta, tente novamente!",
      });
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      console.log(token);
      await userService.remove(token);
      await AsyncStorage.removeItem("USER_ID");
      await AsyncStorage.removeItem("TOKEN");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Erro ao apagar a conta, tente novamente!",
      });
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    }
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      "Tem certeza?",
      "Deseja mesmo apagar sua conta? Essa ação é irreversível.",
      [
        {
          text: "Sim",
          onPress: handleDeleteAccount,
        },
        {
          text: "Não",
        },
      ]
    );
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

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

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
        {isLoading && isLoadingUserInfo ? (
          <ActivityIndicator
            size="large"
            color={colors.appPrimary}
            style={styles.activityIndicator}
          />
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <ButtonDetail
              icon={"user-alt"}
              text1={"Alterar nome"}
              text2={"Altere as informações do usário"}
              separator
              page={"ChangeName"}
              user={data}
            />
            <ButtonDetail
              icon={"mail-bulk"}
              text1={"Alterar e-mail"}
              text2={"Altere o email do usuário"}
              separator
              page={"ChangeEmail"}
              user={data}
            />
            <ButtonDetail
              icon={"lock"}
              text1={"Alterar senha"}
              text2={"Altere a senha do usuário"}
              separator
              page={"ChangePass"}
              user={data}
            />
            <ButtonDetail
              icon={"compass"}
              text1={"Alterar dados de busca"}
              text2={"Altere o radar para suas buscas"}
              page={"ChangeRatio"}
              user={data}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#8B0000" }]}
              onPress={showConfirmDialog}
            >
              <Text style={styles.buttonText}>Apagar Conta</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Animatable.View>
    </View>
  );
}
