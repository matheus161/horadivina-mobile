import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function ButtonDetail({ text1, text2, text3, icon, separator }) {
  return (
    <>
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={30} />
        </View>

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
      </TouchableOpacity>
      {separator && <View style={styles.separator} />}
    </>
  );
}
