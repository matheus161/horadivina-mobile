import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import colors from "../../themes/colors";
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
              onChangeText={onChange}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
              autoCapitalize="none"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appPrimary,
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    marginStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.fontPrimary,
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.appPrimary,
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.fontPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: colors.fontSecondary,
  },
  labelError: {
    alignSelf: "flex-start",
    color: colors.error,
    marginBottom: 8,
  },
});
