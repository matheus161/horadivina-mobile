import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

import Info from "../Institution/Info";
import Mass from "../Institution/Mass";
import News from "../Institution/News";
import Eventos from "../Institution/Eventos";
import Donations from "../Institution/Donations";

const menuItems = [
  {
    index: "info",
    name: "Informações",
  },
  {
    index: "mass",
    name: "Horários",
  },
  {
    index: "news",
    name: "Notícias",
  },
  {
    index: "events",
    name: "Eventos",
  },
  {
    index: "donations",
    name: "Doações",
  },
];

export default function CustomMenu({ institution }) {
  const [selectedItem, setSelectedItem] = useState("info");

  const handleMenuItem = ({ item }) => {
    const isSelected = selectedItem === item.index;

    const handleButtonClick = () => {
      setSelectedItem(item.index);
    };

    return (
      <TouchableOpacity
        style={[styles.button, isSelected && styles.selectedButton]}
        onPress={handleButtonClick}
      >
        <Text style={[styles.itemName, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <>
      <View
        style={{
          height: 60,
        }}
      >
        <FlatList
          data={menuItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={itemSeparator}
          renderItem={handleMenuItem}
          keyExtractor={(item) => item.index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            alignItems: "center",
          }}
        />
      </View>
      <View style={{ flex: 12 }}>
        {selectedItem === "info" && <Info institution={institution} />}
        {selectedItem === "mass" && <Mass institution={institution} />}
        {selectedItem === "news" && <News institution={institution} />}
        {selectedItem === "events" && <Eventos institution={institution} />}
        {selectedItem === "donations" && (
          <Donations institution={institution} />
        )}
      </View>
    </>
  );
}
