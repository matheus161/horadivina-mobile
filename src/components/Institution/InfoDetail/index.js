import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import * as Animatable from "react-native-animatable";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ItemDetail({ text1, text2, text3, icon, separator }) {
  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name={icon} size={30} />
        </TouchableOpacity>

        <View style={styles.infoAddress}>
          <Text style={styles.title}>{text1}</Text>
          {text2 != null && text3 != null ? (
            <Text style={styles.detail}>
              {text2}, {text3}
            </Text>
          ) : (
            <Text style={styles.detail}>{text2}</Text>
          )}
        </View>
      </View>
      {separator && <View style={styles.separator} />}
    </>
  );
}
