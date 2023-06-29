import React from "react";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

import colors from "./src/themes/colors";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.appPrimary}
          barStyle="light-content"
        />
        <Routes />
      </NavigationContainer>
      <Toast />
    </>
  );
}
