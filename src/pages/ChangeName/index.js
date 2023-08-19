import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

import userService from "../../services/userService";

import styles from "./styles";
import colors from "../../themes/colors";

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúãõÃÕâêôÂÊÔ ]+$/, "Nome Inválido")
    .required("Informe seu nome"),
});

export default function ChangeName() {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [name, setName] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [token, setToken] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdateUser = async (data) => {
    try {
      if (name !== confirmName) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Os valores dos campos de nome não coincidem.",
        });
        return;
      }
      setLoading(true);
      await userService.update(data.name, user.email, token);
      Toast.show({
        type: "success",
        text1: "Nome atualizado co sucesso!",
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
        <Text style={styles.message}>Olá, {user.name}</Text>
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu nome"
              style={styles.input}
              onChangeText={(text) => {
                onChange(text);
                setName(text);
              }}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.labelError}>{errors.name?.message}</Text>
        )}

        <Text style={styles.title}>Nome</Text>
        <Controller
          control={control}
          name="confirmName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Confirme seu nome"
              style={styles.input}
              onChangeText={(text) => {
                onChange(text);
                setConfirmName(text);
              }}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.labelError}>{errors.name?.message}</Text>
        )}

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleUpdateUser)}
          >
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        )}
      </Animatable.View>
    </View>
  );
}
