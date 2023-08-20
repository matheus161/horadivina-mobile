import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

import * as Animatable from "react-native-animatable";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import styles from "./styles";
import register from "../../services/registerService";

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúãõÃÕâêôÂÊÔ ]+$/, "Nome Inválido")
    .required("Informe seu nome"),
  email: yup.string().email("Email Inválido").required("Informe seu email"),
  password: yup.string().min(8, "Senha Inválida").required("Informe sua senha"),
});

export default function Register() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      await register(data);
      Toast.show({
        type: "success",
        text1: "Bem-vindo(a)",
        text2: "Conta criada com sucesso!",
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
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
        <Text style={styles.title}>Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu nome"
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur} // chamado quando o é focado
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.labelError}>{errors.name?.message}</Text>
        )}

        <Text style={styles.title}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu email"
              autoCapitalize="none"
              style={styles.input}
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
              placeholder="Digite sua senha"
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
            onPress={handleSubmit(handleRegister)}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.buttonRegister}>
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate("SignIn")}
          >
            Ja possui cadastro? Autentique-se agora
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
