import React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import styles from "./style";
import colors from "../../themes/colors";
import moment from "moment";
import "moment/locale/pt-br";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function InstitutionDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <View>
          <Image
            //source={require("../../assets/image.jpg")}
            source={{ uri: item.image }}
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
            <Text style={styles.message}>{item.title}</Text>
          </View>
        </View>
      </Animatable.View>

      <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
        <Text style={styles.data}>
          {moment(item.data).locale("pt-br").format("DD [de] MMMM [de] YYYY")}
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Text style={styles.description}>{item.description}</Text>
        </ScrollView>
      </Animatable.View>
    </View>
  );
}
