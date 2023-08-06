import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import styles from "./styles";
import colors from "../../themes/colors";

import { useNavigation, useRoute } from "@react-navigation/native";
import CustomMenu from "../../components/CustomMenu";

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
        <View style={styles.avatarContainer}>
          <Image
            // source={require("../../assets/image.jpg")}
            source={{ uri: item.avatar }}
            style={styles.itemAvatar}
          />
          <View style={styles.textOverlay}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                name="arrow-left"
                size={25}
                color={colors.fontPrimary}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.message}>{item.name}</Text>
          </View>
        </View>
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <CustomMenu />
      </Animatable.View>
    </View>
  );
}
