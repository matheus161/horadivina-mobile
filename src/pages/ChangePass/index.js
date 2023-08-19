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
  password: yup.string().min(8, "Senha Inválida").required("Informe sua senha"),
  newPassword: yup
    .string()
    .min(8, "Senha Inválida")
    .required("Informe sua senha"),
  confirmNewPassword: yup
    .string()
    .min(8, "Senha Inválida")
    .required("Informe sua senha"),
});

export default function ChangePass() {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdateUser = async (data) => {
    try {
      if (newPassword !== confirmNewPassword) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2:
            "Os valores dos campos da nova senha e confirme nova senha não coincidem.",
        });
        return;
      }
      if (password === newPassword) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "A nova senha não pode ser igual a antiga.",
        });
        return;
      }
      setLoading(true);
      await userService.changePass(data.password, data.newPassword, token);
      Toast.show({
        type: "success",
        text1: "Senha atualizada com sucesso!",
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "A senha atual está incorreta",
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
        <Text style={styles.title}>Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite a senha atual"
              onChangeText={(text) => {
                onChange(text);
                setPassword(text);
              }}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
              secureTextEntry={true}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.labelError}>{errors.password?.message}</Text>
        )}

        <Text style={styles.title}>Nova Senha</Text>
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite a nova senha"
              onChangeText={(text) => {
                onChange(text);
                setNewPassword(text);
              }}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
              secureTextEntry={true}
            />
          )}
        />
        {errors.newPassword && (
          <Text style={styles.labelError}>{errors.newPassword?.message}</Text>
        )}

        <Text style={styles.title}>Confirme Nova Senha</Text>
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Confirme a nova senha"
              onChangeText={(text) => {
                onChange(text);
                setConfirmNewPassword(text);
              }}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
              secureTextEntry={true}
            />
          )}
        />
        {errors.confirmNewPassword && (
          <Text style={styles.labelError}>
            {errors.confirmNewPassword?.message}
          </Text>
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
