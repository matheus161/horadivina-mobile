import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import * as Animatable from "react-native-animatable";
import styles from "./styles";

const itens = [
  {
    index: "address",
  },
  {
    index: "number",
  },
  {
    index: "whatsapp",
  },
  {
    index: "email",
  },
  {
    index: "website",
  },
  {
    index: "instagram",
  },
  {
    index: "facebook",
  },
];

export default function Info({ institution }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparator}
        renderItem={handleMenuItem}
        keyExtractor={(item) => item.index.toString()}
      />
      <Text>{institution.name}</Text>
    </View>
  );
}
