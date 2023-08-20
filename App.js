import React from "react";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar
          translucent={true}
          barStyle="#3d423c"
          backgroundColor="#3d423c"
        />
        <Routes />
      </NavigationContainer>
      <Toast />
    </>
  );
}
