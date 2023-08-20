import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "./styles";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import login from "../../services/loginService";

const schema = yup.object({
  email: yup.string().email("Email Inválido").required("Informe seu email"),
  password: yup.string().min(8, "Senha Inválida").required("Informe sua senha"),
});

export default function SignIn() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignIn = async (data) => {
    try {
      setLoading(true);
      const response = await login(data);
      await AsyncStorage.setItem("USER_ID", response.user._id);
      await AsyncStorage.setItem("TOKEN", response.token);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Email ou senha incorretos, tente novamente!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite um email"
              style={styles.input}
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.labelError}>{errors.email?.message}</Text>
        )}

        <Text style={styles.title}>Senha</Text>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
              secureTextEntry={true}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.labelError}>{errors.password?.message}</Text>
        )}

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSignIn)}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
