import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function CustomMenu() {
  const menuItems = [
    {
      index: 1,
      name: "Informações",
    },
    {
      index: 2,
      name: "Missas",
    },
    {
      index: 3,
      name: "Notícias",
    },
    {
      index: 4,
      name: "Eventos",
    },
    {
      index: 5,
      name: "Doações",
    },
  ];

  const handleMenuItem = ({ item }) => (
    <TouchableOpacity>
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={menuItems}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={handleMenuItem}
    />
  );
}
