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
import { useForm, Controller } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

import userService from "../../services/userService";

import styles from "./styles";
import colors from "../../themes/colors";

const schema = yup.object({
  actualEmail: yup
    .string()
    .email("Email Inválido")
    .required("Informe seu email"),
  email: yup.string().email("Email Inválido").required("Informe seu email"),
  confirmEmail: yup
    .string()
    .email("Email Inválido")
    .required("Informe seu email"),
});

export default function ChangeEmail() {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [actualEmail, setActualEmail] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
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
      if (actualEmail !== user.email) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "O email atual está incorreto.",
        });
        return;
      }
      if (actualEmail === email && actualEmail === confirmEmail) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "O novo email não pode ser igual ao antigo.",
        });
        return;
      }
      if (email !== confirmEmail) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Os valores dos campos do email não coincidem.",
        });
        return;
      }
      setLoading(true);
      await userService.update(user.name, data.email, token);
      Toast.show({
        type: "success",
        text1: "Email atualizado com sucesso!",
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
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
        <Text style={styles.title}>Email Atual</Text>
        <Controller
          control={control}
          name="actualEmail"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu email atual"
              style={styles.input}
              onChangeText={(text) => {
                onChange(text);
                setActualEmail(text);
              }}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
            />
          )}
        />
        {errors.actualEmail && (
          <Text style={styles.labelError}>{errors.actualEmail?.message}</Text>
        )}

        <Text style={styles.title}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu novo email"
              style={styles.input}
              onChangeText={(text) => {
                onChange(text);
                setEmail(text);
              }}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.labelError}>{errors.email?.message}</Text>
        )}

        <Text style={styles.title}>Email</Text>
        <Controller
          control={control}
          name="confirmEmail"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Confirme seu novo email"
              style={styles.input}
              onChangeText={(text) => {
                onChange(text);
                setConfirmEmail(text);
              }}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
            />
          )}
        />
        {errors.confirmEmail && (
          <Text style={styles.labelError}>{errors.confirmEmail?.message}</Text>
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
