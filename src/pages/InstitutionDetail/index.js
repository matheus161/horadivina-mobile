import React from "react";
import { Text, View, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function InstitutionDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  //const [isLoading, setIsLoading] = useState(false);

  console.log(item.avatar);
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        {/* <Text style={styles.message}>{item.name}</Text> */}
        <Image
          source={require("../../assets/image.jpg")}
          style={styles.itemAvatar}
        />
      </Animatable.View>

      <Animatable.View
        animation={"fadeInUp"}
        style={styles.containerForm}
      ></Animatable.View>
    </View>
  );
}
